import mongoose from "mongoose"

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
    images_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    shoe_name: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  slides: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
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
}, {
  timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;