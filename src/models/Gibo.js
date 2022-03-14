import mongoose from 'mongoose';

const giboSchema = new mongoose.Schema({
  title: { type: String },
  blackPlayer: { type: String, required: true },
  whitePlayer: { type: String, required: true },
  adventage: { type: Number, required: true, default: 6.5 },
  result: { type: String, required: true },
  gibo: { type: Array, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Gibo = mongoose.model('Gibo', giboSchema);

export default Gibo;
