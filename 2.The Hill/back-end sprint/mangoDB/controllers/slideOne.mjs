import User from "../models/user.mjs";


// get slideOne
export const getSlideOne = ( req, res ) => {
    console.log( "getSlideOne" ,req.user )
    if ( !req.user ) {
        return res.redirect("/login")
    }
    const _id = req.user._id;
    const name = req.user.name;
    

    req.session.user = { _id, name };
  
    User.findOne({ user: _id, name })
    .then(profile => {
        res.render("slideOne", { 
            profile, _id, name, slide1: '', slide2: '', slide3: '', slide4: '', avatar: '', image: ''})
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    }
    )
}

// post slideOne
export const postSlides = async (req, res) => {
    console.log("postSlides", req.files);
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            throw new Error("User not found");
        }
        if (req.body.bio) {
            user.bio = req.body.bio;
        }
        if (req.files && Object.keys(req.files).length > 0) {
            if (req.files['avatar'] && req.files['avatar'].length > 0) {
                user.avatar = req.files['avatar'][0].filename;
            }
            if ( req.files['picture'] && req.files['picture'].length > 0 ) {
                user.image = req.files['picture'][0].filename;
            }
            if (req.files['image'] && req.files['image'].length > 0) {
                user.slide1 = req.files['image'][0].filename;
            }
            if (req.files['image'] && req.files['image'].length > 1) {
                user.slide2 = req.files['image'][1].filename;
            }
            if (req.files['image'] && req.files['image'].length > 2) {
                user.slide3 = req.files['image'][2].filename;
            }
            if (req.files['image'] && req.files['image'].length > 3) {
                user.slide4 = req.files['image'][3].filename;
            }
        }
        await user.save();
        res.render("dashbord", {
            image: user.image,
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
