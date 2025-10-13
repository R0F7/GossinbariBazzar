import axios from "axios";
import { removeBackground } from "@imgly/background-removal";

// Resize image to safe size (avoid WASM limit)
const resizeImage = (file, maxWidth = 1024) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, "image/png", 1);
    };
    img.src = URL.createObjectURL(file);
  });
};

//  Remove background + Upload to ImgBB + Return URL
const bgRemoveAndUpload = async (image) => {
  try {
    const resized = await resizeImage(image, 1024);

    const bgRemovedBlob = await removeBackground(resized, {
      output: { type: "png" },
    });

    // Wrap Blob into a File to preserve original name
    const bgRemovedFile = new File([bgRemovedBlob], image.name, {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("image", bgRemovedFile);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );

    return data.data.display_url;
  } catch (err) {
    console.error("Upload failed:", err);
    throw new Error("Image upload failed");
  }
};

export default bgRemoveAndUpload;
