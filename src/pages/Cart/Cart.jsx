const Cart = () => {
  return (
    <section className="container mx-auto">
      <div className="flex items-center gap-2 text-[#212B36] mb-6 mt-5">
        <h4>Shop</h4>
        <span>/</span>
        <h4>Cart</h4>
      </div>
      <h2 className="text-2xl font-bold mb-6">Cart</h2>
      <div className="flex gap-10">
        <div className="border w-2/3 -3/4"></div>
        <div className="border w-1/3 -1/4 border-red-700"></div>
      </div>
    </section>
  );
};

export default Cart;
