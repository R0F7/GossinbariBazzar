import { Link, useLoaderData, useParams } from "react-router-dom";

const Articles = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const filteredData = data.find(({ _id }) => id === _id);
  const article = filteredData.articles;

  return (
    <div className="container mx-auto">
      <div className="flex gap-2 mt-3">
        <h4>Home</h4>
        <span>/</span>
        <h4>Page</h4>
      </div>
      <h3 className="text-xl font-bold mt-4 ">{filteredData?.title}</h3>

      <hr className="my-8" />

      <div>
        <div className="grid grid-cols-3 gap-6 ">
          {article.map((item, idx) => (
            <Link
            to={`/article/${id}/${item._id}`}
              key={idx}
              className="border p-4 shadow-sm hover:shadow"
            >
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="">{item.description.slice(0, 150)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
