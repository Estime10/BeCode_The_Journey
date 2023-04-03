import User from "../models/user.mjs"

// get messages
export const getMessages = async (req, res) => {
    console.log("getMessages", req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    const _id = req.user._id;
    const name = req.user.name;
  
    req.session.user = { _id, name };
  
    User.findOne({ user: _id, name })
    .then((profile) => {
        res.render("messages", {
            profile,
            _id,
            name,
            message: [],
            messages: []
          })
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    })
}

// post messages
export const postMessages = async (req, res) => {
    console.log("postMessages", req.body);
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { content } = req.body;
  
      user.message.push({ content });
  
      await user.save();
  
      res.redirect("/messages");
    } catch (err) {
      res.json({ message: err.message });
    }
}