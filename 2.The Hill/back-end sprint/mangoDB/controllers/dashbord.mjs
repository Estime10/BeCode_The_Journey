import User from "../models/user.mjs";


// get Dashbord
export const getDashbord = async (req, res) => {
  console.log("getDashbord", req.user);
  try {
    console.log(req.user);
    if (!req.user) {
      return res.redirect("/login");
    }
    const { name, avatar, images, slides, _id } = req.user;

    // If there are more than 4 slides, only show the last 4
    const lastFourSlides = slides.slice(-4);

    res.render("dashbord", { name, avatar, images, slides, _id });
  } catch (err) {
    res.json({ message: err.message });
  }
};





// post Dashbord
export const postDashbord = async (req, res) => {
  console.log("postDashorb", req.files);
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { avatar, picture, image } = req.files;

    if (avatar && avatar.length > 0) {
      user.avatar = avatar[0].filename;
    }

    if (picture && picture.length > 0) {
      const images = picture.slice(0, 999).map(file => file.filename);
      user.images.push(...images);
    }

    if (image && image.length > 0) {
      const slides = image.slice(0, 4).map(file => file.filename);
      const currentSlides = user.slides.slice(0, 3);
      user.slides = [...slides, ...currentSlides];
    }

    await user.save();
    res.redirect("/dashbord");

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};










