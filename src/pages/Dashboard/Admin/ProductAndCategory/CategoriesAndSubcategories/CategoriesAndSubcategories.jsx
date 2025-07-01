import Table from "@/components/Table/Table";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import UpdateCategoryModal from "./UpdateCategoryModal/UpdateCategoryModal";
import useGetSecureData from "@/hooks/useGetSecureData";

const CategoriesAndSubcategories = () => {
  //   const [categories, setCategories] = useState([]);
  const columnHelper = createColumnHelper();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [category, setCategory] = useState({});

  //   useEffect(() => {
  //     fetch("/categories.json")
  //       .then((res) => res.json())
  //       .then((data) => setCategories(data));
  //   }, []);

  const { data: categories, refetch } = useGetSecureData(
    "category for admin",
    "/categories"
  );
  //   console.log(categories);

  const columns = [
    columnHelper.accessor("categoryImage", {
      cell: (info) => <img className="w-[50px]" src={info.getValue()} alt="" />,
      header: "Image",
    }),

    columnHelper.accessor("categoryName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category Name",
    }),

    columnHelper.accessor("icon", {
      cell: (info) => <img className="w-[30px]" src={info.getValue()} alt="" />,
      header: "Icon",
    }),

    columnHelper.accessor("", {
      cell: (info) => <span>{info.getValue() || 999}</span>,
      header: "Number of Products",
    }),

    columnHelper.accessor("createdAt", {
      cell: (info) => {
        const value = info.getValue();
        return <span>{new Date(value).toLocaleDateString()}</span>;
      },
      header: "Created Date",
    }),

    columnHelper.accessor("_id", {
      cell: (info) => {
        const id = info.getValue();
        const find_category = categories.find((cat) => cat._id === id);

        return (
          <Button
            onClick={() => {
              setIsOpenModal(true), setCategory(find_category);
            }}
          >
            Edit / Rename
          </Button>
        );
      },
      header: "Edit / Rename",
    }),
  ];

  return (
    <section className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">
          🗂️ Manage Categories & Subcategories
        </h1>
        <Button onClick={() => setIsOpenModal(true)}>Add New Category</Button>
      </div>

      <Table columns={columns} data={categories}></Table>

      <UpdateCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        data={category}
        refetch={refetch}
      ></UpdateCategoryModal>
    </section>
  );
};

export default CategoriesAndSubcategories;
