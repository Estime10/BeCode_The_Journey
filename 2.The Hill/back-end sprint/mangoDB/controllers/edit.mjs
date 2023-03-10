import User from "../models/user.mjs";

// get posts
export const editPost = async (req, res) => {
  console.log("editpost", req.user);
  try {
    console.log(req.user);
    // Check if there is a logged in user
    if (!req.user) {
      return res.redirect("/dashbord");
    }
    const { name, _id } = req.user;
    
    req.session.user = { _id, name };

    // Find all users who have images
    const users = await User.find({ images: { $exists: true, $ne: [] } });
    // Concatenate all the images from each user into one array
    let images = [];
    users.forEach(user => {
      images = images.concat(user.images);
    });

    // Render the editposts page with the user's profile, all images, and user ID and name
    res.render("editposts", { profile: req.user, images, _id, name });
  } catch (error) {
    // If there is an error, send a 500 response with the error message
    res.status(500).json({ error: error.message });
  }
};

// delete image
export const deleteImage = async (req, res) => {
  const _id = req.params.id;
  const { imageIds } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }

    const imagesToDelete = user.images.filter(image => imageIds.includes(image._id.toString()));
    if (imagesToDelete.length !== imageIds.length) {
      throw new Error('One or more images not found');
    }

    await User.updateOne({ _id: _id }, { $pull: { images: { _id: { $in: imageIds } } } });

    res.status(200).json({ message: 'Images deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};








































    




