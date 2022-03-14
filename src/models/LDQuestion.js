import mongoose from 'mongoose';

const LDQuestionSchema = new mongoose.Schema({
  board: { type: Array, required: true },
  turn: { type: String, required: true },
  answer: { type: Array, required: true },
  failures: { type: Array, required: true },
  title: { type: String },
});

const LDQuestion = mongoose.model('Ldquestion', LDQuestionSchema);

export default LDQuestion;
