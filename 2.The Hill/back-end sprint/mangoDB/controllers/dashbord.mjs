import  User  from "../models/user.mjs";
import  Posts  from "../models/posts.mjs";

// get Dashbord
export const getDashbord = ( req, res ) => {
    console.log( req.user )
    if (!req.user) {
    return res.redirect("/login")
    }
    const { name, email, image, slide1, slide2, slide3, slide4, bio, _id } = req.user;
    res.render("dashbord",
     { name, email, image, slide1, slide2, slide3, slide4, bio, _id });
}

// post Dashbord
export const postDashbord = ( req, res ) => {
    console.log( "dashbordPost", req.body )
    const _id = req.params.id;
    User.findOne( { _id } )
        .then( user => {
        if ( !user ) {
            return res.status( 404 ).json({ error: "User not found" });
        }
        const name = user.name;
        Posts.find({ userId: _id }).sort({ createdAt: -1 }).limit(1)
            .then( posts => {
            if ( !posts.length ) {
                return res.status( 404 ).json({ error: "Post not found" });
            }
            const post = posts[0];
            console.log( "post", post )
            const avatar = post.avatar;
            req.session.user = { _id, name, avatar };
            res.render("dashbord", { _id, name, avatar });
            })
            .catch( error => {
            res.status( 500 ).json({ error: error });
            });
        })
}