import  User  from "../models/user.mjs";


// get Dashbord
export const getDashbord = ( req, res ) => {
    console.log( req.user )
    if (!req.user) {
    return res.redirect("/login")
    }
    const { name, avatar, image, slide1, slide2, slide3, slide4, _id } = req.user;
    res.render("dashbord",
     { name, avatar, image, slide1, slide2, slide3, slide4, _id });
}
// post Dashbord
export const postDashbord = async (req, res) => {
    console.log("dashbordPost", req.files);
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        throw new Error("User not found");
      }
      if (req.files && Object.keys(req.files).length > 0) {
        if (req.files["avatar"] && req.files["avatar"].length > 0) {
          user.avatar = req.files["avatar"][0].filename;
        }
        if (req.files["picture"] && req.files["picture"].length > 0) {
          const images = req.files["picture"].map((file) => file.filename);
          user.images = images;
        }
        if (req.files["image"] && req.files["image"].length > 0) {
          user.slide1 = req.files["image"][0].filename;
        }
        if (req.files["image"] && req.files["image"].length > 1) {
          user.slide2 = req.files["image"][1].filename;
        }
        if (req.files["image"] && req.files["image"].length > 2) {
          user.slide3 = req.files["image"][2].filename;
        }
        if (req.files["image"] && req.files["image"].length > 3) {
          user.slide4 = req.files["image"][3].filename;
        }
      }
      await user.save();
      res.render("dashbord", {
        image: user.image, // display the user's image property
        avatar: user.avatar,
        name: user.name,
        _id: user._id,
        slide1: user.slide1,
        slide2: user.slide2,
        slide3: user.slide3,
        slide4: user.slide4,
        bio: user.bio,
        images: user.images, // display the user's images property
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  };
  



// export const postFollow = async (req, res) => {
//     console.log("postFollow", req.body);
//     try {
//       const followers = req.body.followers;
//       const followButton = new User({ _id: req.body.following });
//       await followButton.save();
//       res.redirect("/dashboard"); // redirect outside of the try block
//     } catch (err) {
//       res.json({ message: err.message });
//     }
//   };
  