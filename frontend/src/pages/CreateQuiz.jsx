import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";

const CreateQuiz = () => {
  const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [message, setMessage] = useState(null);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/quiz",
        { title, description, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Quiz created successfully!");
      setTitle("");
      setDescription("");
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    } catch (err) {
      setMessage("Failed to create quiz");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
      {message && <p className="mb-4 text-sm text-green-400">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          className="w-full px-4 py-2 rounded bg-white/10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black dark:text-white"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-2 rounded bg-white/10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black dark:text-white"
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="space-y-2">
            <input
              className="w-full px-4 py-2 rounded bg-white/10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black dark:text-white"
              placeholder={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
            />
            {q.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswer === i}
                  onChange={() => handleQuestionChange(qIndex, "correctAnswer", i)}
                  className="form-radio"
                />
                <input
                  className="flex-1 px-4 py-2 rounded bg-white/10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-black dark:text-white"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, i, e.target.value)}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="relative px-4 py-2 text-white font-semibold rounded overflow-hidden transition duration-300 bg-blue-600 hover:bg-blue-700 group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded blur-sm opacity-0 group-hover:opacity-75 transition duration-500 group-hover:animate-spin-slow"></span>
            <span className="relative z-10">+ Add Question</span>
          </button>

          <button
            type="submit"
            className="relative px-6 py-2 text-white font-semibold rounded overflow-hidden transition duration-300 bg-green-600 hover:bg-green-700 group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 via-lime-500 to-green-600 rounded blur-sm opacity-0 group-hover:opacity-75 transition duration-500 group-hover:animate-spin-slow"></span>
            <span className="relative z-10">Create Quiz</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;