import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  dates: [{ type: Date, required: true }],
  sections: [{ type: Object, required: true }],
});

const Contest = mongoose.model('Contest', contestSchema);

export default Contest;
