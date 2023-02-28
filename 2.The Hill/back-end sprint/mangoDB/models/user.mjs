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
  images: [{
    type: String,
  }],
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
    date: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  posts: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
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
