import { FaStar, FaRegStar } from "react-icons/fa";

function RatingSummary({ summary }) {
  if (!summary) return null;

  const {
    averageRating,
    totalReviews,
    ratingDistribution,
  } = summary;

  const getPercentage = (count) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border">

      <h2 className="text-3xl font-bold mb-8">
        Customer Ratings
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Average Rating */}

        <div className="text-center">

          <h1 className="text-7xl font-bold text-blue-600">
            {averageRating}
          </h1>

          <div className="flex justify-center mt-4 text-3xl">

            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(averageRating) ? (
                <FaStar
                  key={star}
                  className="text-yellow-500"
                />
              ) : (
                <FaRegStar
                  key={star}
                  className="text-gray-300"
                />
              )
            )}

          </div>

          <p className="text-gray-500 mt-4 text-lg">
            Based on {totalReviews} Reviews
          </p>

        </div>

        {/* Rating Breakdown */}

        <div className="space-y-5">

          {[5, 4, 3, 2, 1].map((star) => (

            <div
              key={star}
              className="flex items-center gap-4"
            >

              <span className="w-14 font-semibold">
                {star} ★
              </span>

              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">

                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${getPercentage(
                      ratingDistribution?.[star] || 0
                    )}%`,
                  }}
                />

              </div>

              <span className="w-8 text-center font-semibold">
                {ratingDistribution?.[star] || 0}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default RatingSummary;