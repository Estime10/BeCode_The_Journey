import User from "../models/user.mjs";

// get dashbord
export const getDashbord = async (req, res) => {
  console.log("getdashbord", req.user);
  try {
    console.log("req.user", req.user);

    if (!req.user) {
      return res.redirect("/login");
    }
    
    const { name, avatar, images, slides, _id, shoe_name } = req.user;

    console.log("slides before slice", slides);

    // If there are more than 4 slides, only show the last 4
    const lastFourSlides = slides.slice(-4);

    console.log("lastFourSlides", lastFourSlides);

    res.render("dashbord", { 
      name,
      avatar,
      images,
      shoe_name,
      slides: lastFourSlides,
      _id });
      
  } catch (err) {
    res.json({ message: err.message });
  }
}

// post dashbord
export const postDashbord = async (req, res) => {
  console.log("postdashbord", req.files);
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { avatar, picture, image } = req.files;
    const shoe_name = req.body.shoe_name;

    if (avatar && avatar.length > 0) {
      user.avatar = avatar[0].filename;
    }

    if (picture && picture.length > 0) {
      const images = picture.slice(0, 999).map(file => ({ url: file.filename }));
      user.images.push(...images);
      // Add shoe_name to the last image that was added
      const lastImageIndex = user.images.length - 1;
      user.images[lastImageIndex].shoe_name = req.body.shoe_name;
    }

    if (image && image.length > 0) {
      const slides = image.slice(0, 4).map(file => ({ url: file.filename }));
      user.slides.push(...slides);
      if (user.slides.length > 4) {
        user.slides.splice(0, user.slides.length - 4);
      }
    }    
    
    console.log("user after update", user);

    await user.save();
    res.redirect("/dashbord");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


