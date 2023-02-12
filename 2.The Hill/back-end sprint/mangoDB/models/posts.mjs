import mongoose from "mongoose"

const test = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  avatar: {
      type: String,
  },
  image: {
    type: String,
  },
  slide1: {
    type: String,
  },
  slide2: {
    type: String,
  },
  slide3: {
    type: String,
  },
  slide4: {
    type: String,
  },
  bio: {
    type: String,
  },
  postContent: {
    type: String,
  },
  postTitle: {
    type: String,
  },
    date: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: {
    type: Number,
  },
},
  { timestamps: true }
);


const Post = mongoose.model("Post", test)
export default Post