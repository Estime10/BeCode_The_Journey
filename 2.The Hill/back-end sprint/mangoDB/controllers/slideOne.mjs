import User from "../models/user.mjs";
import Posts from "../models/posts.mjs";

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
export const postSlideOne = ( req, res ) => {
    console.log( "postSlideOne" ,req.files);

    req.files.forEach(file => {
      const slide1 = new Posts({ 
        slide1: file.filename,
        name: req.body.name,
        userId: req.params.id,
    })
    slide1.save((err) =>{
        if (err) {
            res.json({ message: err.message });
        } else {
        User.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.json({ message: err.message });
            } else {
            const { _id, name, slide1 } = user;
            res.render("dashbord", { slide1: file.filename, name,  _id });
            }
        })
    }
})  
})
}
