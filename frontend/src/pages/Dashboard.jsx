import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const { token } = useAuthContext();
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  // fetching quizes from the backend
   useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quiz", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(res.data);
      } catch (err) {
        setError("Failed to load quizzes");
      }
    };

    fetchQuizzes();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Quizzes</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700"
          >
            <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {quiz.description || "No description provided."}
            </p>
            <Link
              to={`/quiz/${quiz._id}`}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-transform transform hover:-translate-y-0.5"
            >
              Attempt Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

