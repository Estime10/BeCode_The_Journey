import User from "../models/user.mjs";


// get slideOne
export const getSlides = ( req, res ) => {
    console.log( "getSlides" ,req.user )
    if ( !req.user ) {
        return res.redirect("/login")
    }
    const _id = req.user._id;
    const name = req.user.name;
    

    req.session.user = { _id, name };
  
    User.findOne({ user: _id, name })
    .then(profile => {
        res.render("slides", { 
            profile, _id, name, slides: '', avatar: '', images: ''})
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    }
    )
}



