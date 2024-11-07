
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
    <div>
      <div>
        <h1>{article.title}</h1>
        <h6>{article.updated}</h6>
        <p dangerouslySetInnerHTML={{ __html: article.description }} />
      </div>
    </div>
  );
};

export default Article;
