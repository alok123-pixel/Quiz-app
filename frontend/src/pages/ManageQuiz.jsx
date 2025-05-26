import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";


const Managequiz = () => {

  const { token } = useAuthContext();
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/quiz/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
      setMessage("Quiz deleted successfully.");
    } catch (err) {
      setError("Failed to delete quiz");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Quizzes</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {message && <p className="text-green-400 mb-4">{message}</p>}

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
            <button
              onClick={() => handleDelete(quiz._id)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Managequiz
