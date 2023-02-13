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
        if (!req.files || !req.files.length) {
            throw new Error("No files were uploaded");
        } 
        user.avatar = req.files[0].filename;
        user.slide1 = req.files[1].filename;
        user.slide2 = req.files[2].filename;
       
        await user.save();
        res.render("dashbord", {
            avatar: user.avatar,
            name: user.name,
            _id: user._id,
            slide1: user.slide1,
            slide2: user.slide2,
           
        });
    } catch (err) {
        res.json({ message: err.message });
    }
}
