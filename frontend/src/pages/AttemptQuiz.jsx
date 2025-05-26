import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from "../context/AuthContext.jsx";

const AttemptQuiz = () => {
     const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) {
        setError("Failed to load quiz");
      }
    };

    fetchQuiz();
  }, [id, token]);

  const handleSelect = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/quiz/${id}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Navigate to result page with score and total
      navigate("/result", { state: res.data });
    } catch (err) {
      setError("Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!quiz) return <p className="text-gray-300">Loading quiz...</p>;

  return (
       <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>
      {quiz.questions.map((q, index) => (
        <div key={index} className="mb-6">
          <p className="font-semibold mb-2">
            {index + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer border dark:border-gray-600 ${
                  answers[index] === i
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={answers[index] === i}
                  onChange={() => handleSelect(index, i)}
                  className="form-radio hidden"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  )
}

export default AttemptQuiz

