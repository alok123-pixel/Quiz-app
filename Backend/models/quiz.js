import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
{
  question: String,
  options: [String],
  correctAnswer: Number
}
);

const QuizSchema = new mongoose.Schema(
 {
  title: String,
  description: String,
  timeLimit: Number,
  questions: [QuestionSchema]
}
);

 const Quiz = mongoose.model('Quiz', QuizSchema);
 export default Quiz

