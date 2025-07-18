import imageUpload from "@/api/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AddBlog = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const imgFile = form.picture.files[0];
    const description = form.description.value;
    const tag1 = form.tag1.value;
    const tag2 = form.tag2.value;
    const tag3 = form.tag3.value;
    let image_link;

    try {
      image_link = await imageUpload(imgFile);
    } catch (error) {
      console.log(error);
    }

    const info = {
      title,
      description,
      image: image_link,
      categories: [tag1, tag2, tag3],
    };
    console.table(info);
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4 mt-14"
      >
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" type="text" name="title" placeholder="Title" />
        </div>
        <div className="w-full max-w-sm space-y-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" name="picture" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Type your message here."
          />
        </div>

        <div className="flex gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="tag1">Tag</Label>
            <Input id="tag1" type="text" name="tag1" placeholder="Tag 1" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tag2">Tag</Label>
            <Input id="tag2" type="text" name="tag2" placeholder="Tag 2" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tag3">Tag</Label>
            <Input id="tag3" type="text" name="tag3" placeholder="Tag 3" />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-full scale-100 active:scale-95 transition duration-300"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};

export default AddBlog;
