import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String },
  festivals: [String],
  cuisine: [String],
  music: [String],
});

export default mongoose.model("State", stateSchema);
