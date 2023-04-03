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
    slide_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  message: [{
    message_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    content: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
}],
  },
 {
  timestamps: true,
});


const User = mongoose.model("User", UserSchema);

export default User;