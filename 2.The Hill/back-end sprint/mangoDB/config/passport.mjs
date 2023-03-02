import bcrypt from "bcryptjs"
import User from "../models/user.mjs"
import { Strategy as LocalStrategy } from "passport-local";


const configPassport = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'EMAIL ADDRESS NOT REGISTERED' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'WRONG PASSWORD' });
                }
            } catch (err) {
                console.log(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

export default configPassport;