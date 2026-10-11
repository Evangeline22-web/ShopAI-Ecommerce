import { FaStar } from "react-icons/fa";

function RatingSummary({ summary }) {
  if (!summary) return null;

  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-8">
        Customer Ratings
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="text-center">
          <h1 className="text-7xl font-bold text-blue-600">
            {summary.averageRating.toFixed(1)}
          </h1>

          <div className="flex justify-center text-yellow-500 text-3xl mt-4">
            {[1,2,3,4,5].map((star)=>(
              <FaStar key={star}/>
            ))}
          </div>

          <p className="text-gray-500 mt-4">
            Based on {summary.totalReviews} Reviews
          </p>
        </div>

        <div className="space-y-4">

          {ratings.map((star)=>{

            const count =
              summary.ratingDistribution?.[star] || 0;

            const percentage =
              summary.totalReviews === 0
                ? 0
                : (count / summary.totalReviews) * 100;

            return (

              <div
                key={star}
                className="flex items-center gap-4"
              >

                <span className="w-10 font-semibold">
                  {star} ★
                </span>

                <div className="flex-1 bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <span>{count}</span>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
}

export default RatingSummary;