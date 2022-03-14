import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  // writer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  writtenAt: { type: String, required: true },
  isImportant: { type: Boolean, required: true, default: false },
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
