import User from "../models/user.mjs";

// get avatar
export const getAvatar = async (req, res) => {
  try {
    console.log("getAvatar", req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    const { _id, name } = req.user;
    req.session.user = { _id, name };

    const profile = await User.findOne({ _id });
    res.render("avatar", {
      profile,
      _id,
      name,
      avatar: "",
      images: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
