import NotFoundImg from "../../assets/list-empt.webp";
import PropTypes from "prop-types";

const EmptyState = ({ restQuery }) => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div>
        <div className="w-[352px] h-[250px]">
          <img className="w-full h-full" src={NotFoundImg} alt="404" />
        </div>

        <h1 className="text-[#11023B] text-[28px] font-medium mb-1.5 text-center">
          Sorry, no result found...
        </h1>
        <p className="mb-6 text-[#6C6F89] text-sm w-[320px] text-center">
          We couldn&apos;t find any results. Try adjusting your filters or click
          the reset button to view all options.
        </p>

        <div className="text-center">
          <button
            onClick={restQuery}
            className="text-sm text-[#36364A] px-3 py-1.5 rounded-lg border-[#E9ECF1] border shadow font-medium hover:shadow-md active:scale-95 scale-100 transition duration-300"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  );
};

EmptyState.propTypes = {
  restQuery: PropTypes.func,
};

export default EmptyState;
