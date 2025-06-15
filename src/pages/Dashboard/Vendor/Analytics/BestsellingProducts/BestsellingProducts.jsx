import AnalyticsHeader from "@/components/analyticsHeader/analyticsHeader";
import useAuth from "@/hooks/useAuth";
import useGetSecureData from "@/hooks/useGetSecureData";
import { useEffect, useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import { Link } from "react-router-dom";

const BestsellingProducts = () => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const [range, setRange] = useState([
    {
      startDate: oneMonthAgo,
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // const [groupBy, setGroupBy] = useState("monthly");
  const { user, minPrice, maxPrice, setMinPrice, setMaxPrice } = useAuth();
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
  const columnHelper = createColumnHelper();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [topProducts, setTopProducts] = useState([]);
  const oneCall = useRef(false);
  const [storeMaxPrice, setStoreMaxPrice] = useState(maxPrice);

  const { data: orders = [] } = useGetSecureData(
    [
      "best-selling-products",
      debouncedMinPrice,
      debouncedMaxPrice,
      category,
      range,
    ],
    `/orders-receive/${user?.email}?startDate=${range[0].startDate}&endDate=${range[0].endDate}&minPrice=${debouncedMinPrice}&maxPrice=${debouncedMaxPrice}&category=${category}`
  );

  const { data: getOrders = [] } = useGetSecureData(
    "best-selling-products-price",
    `/orders-receive/${user?.email}`
  );

  const { data: items = [] } = useGetSecureData(
    "vendor_products",
    `/vendor-products/${user?.email}`
  );

  const prices = getOrders.flatMap((order) =>
    order.products.map((p) => Number(p.discounted_price || p.price))
  );

  useEffect(() => {
    if (!oneCall.current && prices.length > 0) {
      const max_Price = prices.length ? Math.max(...prices) : 0;
      setMaxPrice(max_Price);
    }
    
    if (getOrders.length > 0) {
      const categoriesX = getOrders.flatMap((order) =>
        order.products.map((item) => item.category)
      );
      const uniqueCategories = [...new Set(categoriesX)];
      setCategories(uniqueCategories);
    }
  }, [getOrders, prices, setMaxPrice]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500);
    return () => clearTimeout(t);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    const productMap = {};

    orders.forEach((order) => {
      order.products.forEach((product) => {
        const id = product.id;
        const quantity = Number(product.quantity);
        const price = Number(product.price);
        const discounted_price = Number(product.discounted_price);
        const cost_price = Number(product.cost_price);

        const revenue = (discounted_price || price) * quantity;
        const profit = revenue - cost_price * quantity;
        const profitMargin = ((profit / revenue) * 100).toFixed(2);

        const findProduct = items.find((item) => item._id == id);

        if (!productMap[id]) {
          productMap[id] = {
            id,
            name: product.name,
            image: product.image,
            category: product.category,
            profitMargin,
            unitsSold: 0,
            totalRevenue: 0,
            rating: findProduct?.rating,
            total_product: findProduct?.total_product,
          };
        }

        productMap[id].unitsSold += quantity;
        productMap[id].totalRevenue += revenue;
      });
    });

    const productsArray = Object.values(productMap);
    const topProductsSorted = [...productsArray].sort(
      (a, b) => b.unitsSold - a.unitsSold
    );

    setTopProducts(topProductsSorted);
  }, [orders, items]);

  useEffect(() => {
    if (!oneCall.current && orders.length > 0 && items.length > 0) {
      let localMaxPrice = 0;
      // const localCategories = [];

      orders.forEach((order) => {
        // console.log(order);
        order.products.forEach((product) => {
          const price = Number(product.price);
          const discounted_price = Number(product.discounted_price);

          const effectivePrice = discounted_price || price;
          if (effectivePrice > localMaxPrice) {
            localMaxPrice = effectivePrice;
          }

          // const category = product.category;
          // if (category && !localCategories.includes(category)) {
          //   localCategories.push(category);
          // }
        });
      });

      oneCall.current = true;
      // setMaxPrice(localMaxPrice);
      // setCategories(localCategories);
      setStoreMaxPrice(localMaxPrice);
    }
  }, [categories, items.length, maxPrice, orders, setMaxPrice, range]);

  const restQuery = () => {
    const today = new Date();

    if (
      storeMaxPrice === maxPrice &&
      category === "" &&
      range[0].startDate.getDate() === oneMonthAgo.getDate() &&
      range[0].endDate.getDate() === today.getDate()
    )
      return;

    // if (oneCall.current) {
    setRange([
      {
        startDate: oneMonthAgo,
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setCategory("");
    setMinPrice(0);
    setMaxPrice(storeMaxPrice);
    // }
  };

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-4">
            <img
              src={row.image}
              alt={row.name}
              className="w-12 h-10 object-cover rounded"
            />
            <span className="font-medium">{row.name}</span>
          </div>
        );
      },
      header: "Product",
    }),

    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Category",
    }),

    columnHelper.accessor("unitsSold", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Units Sold",
    }),

    columnHelper.accessor("totalRevenue", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Revenue",
    }),

    columnHelper.accessor("profitMargin", {
      cell: (info) => <span>{info.getValue()}%</span>,
      header: "Profit Margin",
    }),

    columnHelper.accessor("rating", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "rating",
    }),
    columnHelper.accessor("total_product", {
      cell: (info) => {
        const value = info.getValue();

        if (value > 10) {
          return <span>In Stock</span>;
        } else if (value && value < 10) {
          return <span>Low Stock</span>;
        } else {
          return <span>Out of Stock</span>;
        }
      },
      header: "Stock status",
    }),
    columnHelper.accessor("id", {
      cell: (id) => (
        <Link
          to={`/dashboard/product-management/view-reviews/${id.getValue()}`}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold border border-blue-500 rounded-lg px-4 py-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
            View Reviews
          </button>
        </Link>
      ),
      header: "",
    }),
  ];

  return (
    <section className="bg-[#FAFAFC] h-full p-4 pb-0">
      {/* heading */}
      <AnalyticsHeader
        title="Bestselling Products"
        range={range}
        setRange={setRange}
        // groupBy={groupBy}
        // setGroupBy={setGroupBy}
        categories={categories}
        category={category}
        setCategory={setCategory}
        restQuery={restQuery}
      ></AnalyticsHeader>

      {/* Top 10 Bestselling Products */}
      <Table data={topProducts} columns={columns}></Table>
    </section>
  );
};

export default BestsellingProducts;
