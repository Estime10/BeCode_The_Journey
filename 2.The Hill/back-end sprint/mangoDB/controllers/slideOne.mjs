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
        res.render("slideOne", { profile, _id, name, slide1: '' })
    })
    .catch(error => {
        res.status(500).json({ error: error });
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
        if (req.files && req.files.length) {
            user.avatar = req.files[0].filename;
            if (req.files[1]) {
                user.slide1 = req.files[1].filename;
            }
            if (req.files[2]) {
                user.slide2 = req.files[2].filename;
            }
            if (req.files[3]) {
                user.slide3 = req.files[3].filename;
            }
            if (req.files[4]) {
                user.slide4 = req.files[4].filename;
            }
        }
        await user.save();
        res.render("dashbord", {
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
}


