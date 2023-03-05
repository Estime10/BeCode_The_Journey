import User from "../models/user.mjs";

// get avatar
export const getAvatar = (req, res) => {
  console.log("getAvatar", req.user);
  if (!req.user) {
    return res.redirect("/login");
  }
  const _id = req.user._id;
  const name = req.user.name;

  req.session.user = { _id, name };

  User.findOne({ _id })
    .then((profile) => {
      res.render("avatar", {
        profile,
        _id,
        name,
        avatar: "",
        images: [],
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
