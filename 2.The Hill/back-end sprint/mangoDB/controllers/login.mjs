import passport from "passport"

// get login
export const getLogin = ( req, res ) =>{
    res.render("login")
}

// post login
export const postLogin = ( req, res, next ) =>{
    console.log(req.body)
    passport.authenticate("local", ( err, user, info ) =>{
        if ( err ) {
            return next ( err )
        }
        if ( !user ) { 
            req.flash( "error", "Incorrect email or password" )
            return res.redirect ("/login")
        }
        req.logIn ( user, ( err ) => {
        if ( err ) { 
            return next ( err ) 
        }
        return res.redirect ("/dashbord")
        })
    })( req, res, next )
}
