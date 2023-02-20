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
export const postDashbord = async ( req, res ) => {
    console.log( "dashbordPost", req.body );
    try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    if (!user) {
    throw new Error("User not found");
    }
    const name = user.name;
    const avatar = user.avatar;
    const image = user.image;
    req.session.user = { _id, name, avatar,image };
    res.render("dashbord", { _id, name, avatar, image, slide1: '', slide2: '', slide3: '', slide4: '' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    }