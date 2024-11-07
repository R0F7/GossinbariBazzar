
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useLoaderData, useParams } from "react-router-dom";

const Article = () => {
  const data = useLoaderData();
  const { id, articleId } = useParams();

  // Find the category that matches the category id
  const category = data.find((item) => id === item._id);

  // Find the specific article in the category
  const article = category?.articles.find((art) => art._id === articleId);

  console.log(article);
  return (
    <div className="container mx-auto">
      <div className="w-[65%] mx-auto mt-14 border border-t-0 shadow p-24">
        <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
        <h6 className="mb-6 text-[#868686]">{article.updated}</h6>
        <p dangerouslySetInnerHTML={{ __html: article.description }} />
        <hr className="my-10"/>
        <div className="flex items-center justify-between">
            <h5>Was this article helpful?</h5>
            <div className="flex gap-4">
                <div className="flex items-center gap-1">
                    <i><BiSolidLike /></i>
                    <h6>Yes</h6>
                </div>
                <div className="flex items-center gap-1">
                    <i><BiSolidDislike /></i>
                    <h6>No</h6>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
