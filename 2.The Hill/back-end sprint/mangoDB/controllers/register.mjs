import User from "../models/user.mjs"
import bcrypt from "bcryptjs"


// get Register
export const getRegister = ( req, res ) => {
    res.render("register")
}

// post Register
export const postRegister = ( req, res ) => {
    console.log(req.body)
    const { name, email, password, password2 } = req.body
    let errors = []
    // Check required fields
    if ( !name || !email || !password || !password2 ){
         errors.push({ message: "Please fill in all fields"}) 
     }
        // Check passwords match
        if ( password !== password2 ){
            errors.push({ message: "Password do not match"})
        }
        // Check password lenght
        if ( password.length <6 ){
            errors.push({ message: "Password should contain min 6 characters"})
        }
        if ( errors.length > 0 ){
            res.render("register", {
                errors,
                name: name,
                email: email,
                password: password,
                password2: password2
            })
        }
        else {
            // Validation passed
        User.findOne( { email: email } )
            .then( user => {
            if ( user ) {
            // User exists
            errors.push({ message: "Email already registered"})
            res.render("register", {
                errors,
                name: name,
                email: email,
                password: password,
                password2: password2
            })
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                // Hash Password
                bcrypt.genSalt(10, ( err, salt ) => 
                bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                    if ( err ) throw err
                    // Set password to hashed
                    newUser.password = hash
                    // Save user
                    newUser.save()
                        .then( user => {
                            req.flash( "success_msg", "You are now registered and can log in" )
                            res.redirect("/login")
                        })
                        .catch( err => console.log( err ))
                }))
            }
        })
    }
}

