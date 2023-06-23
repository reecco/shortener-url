import mongoose, { Schema } from "mongoose";

const UrlSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  shortener: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

const Url = mongoose.model("urls", UrlSchema);

export default Url;