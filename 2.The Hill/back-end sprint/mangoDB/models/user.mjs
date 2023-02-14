import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true,
  },
  email: {
  type: String,
  required: true,
  },
  password: {
  type: String,
  required: true,
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
    default: "",
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
        {
          timestamps: true
        }
      );
      
const User = mongoose.model("User", UserSchema);
         

export default User
