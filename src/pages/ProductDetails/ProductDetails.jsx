import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  
  return (
    <div>
      <h4>dddd</h4>
    </div>
  );
};

export default ProductDetails;
