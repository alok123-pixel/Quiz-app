import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
      const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  if (score === undefined || total === undefined) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Access</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Quiz Completed!</h2>
      <p className="text-lg mt-4">
        You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{total}</span>
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
      >
        Back to Dashboard
      </button>
    </div>
  )
}

export default Result
