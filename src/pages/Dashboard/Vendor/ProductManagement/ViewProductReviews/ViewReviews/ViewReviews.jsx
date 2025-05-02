import useGetSecureData from "@/hooks/useGetSecureData";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import Image from "../../../../../../assets/empty_reviews_image.png";

const ViewReviews = () => {
  const { id } = useParams();
  const reviews = useGetSecureData("reviews", `/reviews/${id}`);
  const navigate = useNavigate();

  return (
    <section className="bg-[#EFF1F6] min-h-screen p-8">
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <img src={Image} alt="No Reviews" className="w-[500px]" />
          <p className="text-gray-500 text-lg mb-4">No reviews available.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-[#303030] px-8 border py-2.5 font-semibold shadow hover:shadow-lg transition duration-300"
          >
            Return to Previous page
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {reviews.map((review) => {
            const {
              _id,
              rating,
              review: message,
              user_image,
              name,
              email,
            } = review;

            return (
              <div
                key={_id}
                className="bg-[#F9F9FA] rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 break-inside-avoid"
              >
                {/* Rating */}
                <div className="mb-2">
                  <Rating
                    style={{ maxWidth: 200 }}
                    initialRating={rating}
                    fullSymbol={
                      <FaStar className="text-yellow-500 text-lg mr-1" />
                    }
                    emptySymbol={
                      <FaRegStar className="text-yellow-500 text-lg mr-1.5" />
                    }
                    readonly
                  />
                </div>

                {/* Review Message */}
                <p className="text-gray-700 italic mb-4">
                  &quot;{message}&quot;
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={user_image}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{name}</h4>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ViewReviews;
