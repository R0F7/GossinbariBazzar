import FAQ from "./FAQ/FAQ";

const HelpAndSupport = () => {
  return (
    <section className="p-6">
      <div>
        <div className="w-1/2">
          <h1 className="text-3xl mb-6 font-semibold">
            FAQs <span className="text-base font-normal">(Frequently Asked Questions)</span>
          </h1>
          <FAQ></FAQ>
        </div>
        <div className="w-1/2"></div>
      </div>
    </section>
  );
};

export default HelpAndSupport;
