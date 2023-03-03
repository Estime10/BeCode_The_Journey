import User from "../models/user.mjs";
// get posts
export const editPost = async (req, res) => {
  console.log( "editPost", req.user )
    if ( !req.user ) {
        return res.redirect("/login")
    }
    const _id = req.user._id;
    const name = req.user.name;
    req.session.user = { _id, name };
    const users = await User.find({ images: 
      { $exists: true, $ne: [] } }); 
    let images = [];
    users.forEach(user => {
      images = images.concat(user.images); 
    User.findOne({ user: _id, name })
    .then(profile => {
      res.render("editposts", { 
        profile, images, _id, name, });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
  });
};
// delete post image
export const deleteImage = async (req, res) => {
  console.log( "deleteImage", req.user )

  const selectedIds = req.body.selectedIds;
  // Use Mongoose to delete the selected items from the images array
  User.updateOne(
    { _id: req.user._id },
    { $pull: { images: { _id: { $in: selectedIds } } } },
    (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      // Update the post count in the database
      User.findByIdAndUpdate(
        req.user._id,
        { $inc: { postCount: -selectedIds.length } },
        { new: true }, // Set {new: true} to return the updated document
        (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
          }

          // Redirect back to the main EJS file with the updated data
          res.render("dashbord", { array: result.images, postCount: result.postCount });
        }
      );
    }
  );
};



    




