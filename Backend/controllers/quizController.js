import Quiz from '../models/Quiz.js';

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating quiz' });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating quiz' });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting quiz' });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching quizzes' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching quiz' });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const userAnswers = req.body.answers; // array of indexes
    let score = 0;

    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === userAnswers[i]) score++;
    });

    res.json({ total: quiz.questions.length, score });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting quiz' });
  }
};
