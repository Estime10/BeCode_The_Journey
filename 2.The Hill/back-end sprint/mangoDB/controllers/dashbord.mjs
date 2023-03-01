import  User  from "../models/user.mjs";


// get Dashbord
export const getDashbord = ( req, res ) => {
    console.log( req.user )
    if (!req.user) {
    return res.redirect("/login")
    }
    const { name, avatar, images, slide1, slide2, slide3, slide4, _id } = req.user;
    res.render("dashbord",
     { name, avatar, images, slide1, slide2, slide3, slide4, _id });
}



// post Dashbord
export const postDashbord = async (req, res) => {
    console.log("dashbordPost", req.files);
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        throw new Error("User not found");
      }
  
      // get the current length of the images array
      const currentLength = user.images.length;
  
      if (req.files && Object.keys(req.files).length > 0) {
        const fileKeys = Object.keys(req.files);
        for (let i = 0; i < fileKeys.length; i++) {
          const key = fileKeys[i];
          const files = req.files[key];
          if (key === "avatar" && files.length > 0) {
            user.avatar = files[0].filename;
          } else if (key === "picture" && files.length > 0) {
            for (let j = 0; j < files.length && j < 999; j++) {
              // add the new image file to the next available index in the images array
              user.images[currentLength + j] = files[j].filename;
            }
          } else if (key === "image" && files.length > 0) {
            for (let j = 0; j < files.length && j < 4; j++) {
              // add the new image file to the next available index in the slide array
              user["slide" + (j + 1)] = files[j].filename;
            }
          }
        }
      }
      await user.save();
      res.render("dashbord", {
        images: user.images,
        avatar: user.avatar,
        name: user.name,
        _id: user._id,
        slide1: user.slide1,
        slide2: user.slide2,
        slide3: user.slide3,
        slide4: user.slide4,
        bio: user.bio,
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
  