import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    English: String,
    Spanish: String,
    Japanese: String
  },
  price: Number,
  image: String,
  pdf: String,
  content: {
    English: [String],
    Spanish: [String],
    Japanese: [String]
  }
});

export default mongoose.model("Book", bookSchema);
