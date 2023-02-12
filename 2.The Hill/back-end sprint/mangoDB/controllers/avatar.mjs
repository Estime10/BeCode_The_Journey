import User from "../models/user.mjs";
import Posts from "../models/posts.mjs";


// get Avatar
export const getAvatar = ( req, res ) => {
    console.log( "getAvatar", req.user )
    if (!req.user) {
    return res.redirect("/login")
    }
    const _id = req.user._id;
    const name = req.user.name;

    req.session.user = { _id, name };

    User.findOne({ user: _id, name })
    .then(profile => {
        res.render("avatar", { profile, _id, name, avatar: '' });
    })
    .catch(error => {
        res.status(500).json({ error: error });
    });
}
// post Avatar
export const postAvatar = (req, res) => {
    console.log( "postAvatar" ,req.files);
  
    req.files.forEach(file => {
      const avatar = new Posts({
        avatar: file.filename,
        name: req.body.name,
        userId: req.params.id
      })
      avatar.save((err) => {
        if (err) {
          res.json({ message: err.message });
        } else {
          User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
              res.json({ message: err.message });
            } else {
              const { _id, name, avatar } = user;
              res.render("dashbord", { avatar: file.filename, name, _id });
            }
          })
        }
      })
    })
  }
  
  