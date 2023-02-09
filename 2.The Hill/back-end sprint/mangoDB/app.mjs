import express from "express"
import expressEjsLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import flash from "connect-flash"
import session from "express-session"
import dotenv from "dotenv"
import passport from "passport" 
import passportConfig from './config/passport.mjs'
import User from "./models/user.mjs"
import Posts from "./models/posts.mjs"
import bcrypt from "bcryptjs" 
import multer from "multer"
import bodyParser from "body-parser"

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public/uploads");
      },
      filename: function (req, file, cb) {
      cb(null, file.fieldname + "_"+ Date.now() +"_"+ file.originalname)
      },
  });
  // Init app
  dotenv.config()
  const app = express()
  const PORT = process.env.PORT || 3000
  // DB Congig
  const URI = process.env.ATLAS_URI
  mongoose.set('strictQuery', false)
  mongoose.connect(URI, { useNewUrlParser: true })
      .then(() => console.log("MongoDataBase is connected successfully!"))
      .catch(err => console.log(err))
  mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {console.log('connected')})

// EJS
app.use(expressEjsLayouts);
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'))
app.set("views", "./routes/views");
app.set("view engine", "ejs")
// Static files


// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
)
// Passport middleware
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());
// Global vars middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// Multer middleware
const upload = multer({ storage: storage,
}).single("image");


// Routes 
// Home Page
app.get("/", (req, res)=>{
    res.render("welcome")
})
// Login Page
app.get("/login", ( req, res ) =>{
    res.render("login")
})
// Login Handle
app.post("/login", (req, res, next) => {
  console.log(req.body)
  passport.authenticate("local", (err, user, info) => {
  if (err) { return next(err) }
  if (!user) {
  req.flash("error", "Incorrect email or password")
  return res.redirect("/login")
  }
  req.logIn(user, function(err) {
  if (err) { return next(err) } 
  return res.redirect("/dashbord")
  });
  })(req, res, next)
}) 
// Register Page
app.get("/register", ( req, res ) =>{
    res.render("register")
})
// Register Handle
app.post("/register", ( req, res) =>{ 
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
    User.findOne({ email: email })
        .then(user => {
            if (user){
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
    bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt,(err, hash)=>{
            if (err) throw err
    // set hashed password
    newUser.password = hash
    // save user
    newUser.save()
            .then( user => {
            req.flash("success_msg", "You are now registered")
            res.redirect("/login")
            })
            .catch( err => console.log(err))}))
            }
        })
    }
}) 
// Dashbord Page
app.get("/dashbord", (req, res) => {
  console.log(req.user) 
  if (!req.user) {
  return res.redirect("/login") 
  }
  const { name, email, image, slide1, slide2, slide3, slide4, bio, _id } = req.user;
  res.render("dashbord",
   { name, email, image, slide1, slide2, slide3, slide4, bio, _id });
})
// working for one picture
app.post("/dashbord/:id", (req, res) => {
  console.log("dashbordPost", req.body)
  const _id = req.params.id;
  User.findOne({ _id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const name = user.name;
      Posts.findOne({ userId: _id })
        .then(post => {
          if (!post) {
            return res.status(404).json({ error: "Post not found" });
          }
          console.log("post", post)
          const avatar = post.avatar;
          req.session.user = { _id, name, avatar };
          res.render("dashbord", { _id, name, avatar });
        })
        .catch(error => {
          res.status(500).json({ error: error });
        });
    })
})
// Avatar Page
app.get("/avatar/:id", (req, res) => {
  console.log(req.user)
  if (!req.user) {
    return res.redirect("/login");
  }
  const _id = req.user._id;
  const name = req.user.name;
  
  req.session.user = { _id, name };

  User.findOne({ user: _id, name })
    .then(profile => {
      res.render("avatar", { profile, _id, name, avatar: '' });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
})
// Avatar Handle
app.post("/avatar/:id", upload, (req, res) => { 
  console.log(req.file);
  
  const avatar = new Posts({ 
    avatar: req.file.filename,
    name: req.body.name,
    userId: req.params.id,
  }); 
  avatar.save((err) =>{
    if(err){
      res.json({ message: err.message });
    } else {
      User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
          res.json({ message: err.message });
        } else {
          const { _id, name, avatar } = user;
          res.render("avatar", { avatar: req.file.filename, name,  _id });
        }
      })
    }
  });
})



// still need to try to update the avatar in the dashbord page
// app.put("/dashbord/:id", (req, res) => {
//   console.log("dashbordPut", req.body)
//   const _id = req.params.id;
//   User.findOne({ _id })
//   .then(user => {
//   if (!user) {
//   return res.status(404).json({ error: "User not found" });
//   }
//   const name = user.name;
//   Posts.findOneAndUpdate({ userId: _id }, { avatar: req.body.avatar }, { new: true })
//   .then(post => {
//   if (!post) {
//   return res.status(404).json({ error: "Post not found" });
//   }
//   console.log("post", post)
//   const avatar = post.avatar;
//   req.session.user = { _id, name, avatar };
//   res.render("dashbord", { _id, name, avatar });
//   })
//   .catch(error => {
//   res.status(500).json({ error: error });
//   });
//   })
// })

// app.get('/logout', (req, res) => {
//   // Use the logout provided by passport, passing in a callback
//   req.logout((err) => {
//   if (err) {
//   console.error(err);
//   }
//   res.redirect('/login');
//   });
// });     


// test  successfull upload to database( post schema)

// app.post("/test", upload, ( req, res ) =>{
//   console.log(req.body)
//   console.log(req.file)
  
//     const user = new Posts({
//         userId: req.body.userId,
//         avatar: req.file.filename,
//     });
//     console.log(user)
//     user.save((err) =>{
//         if(err){
//             res.json({ message: err.message, type: "danger" })
//         } else {
//             res.redirect("/test");
//         }
//     })
// })

// find one and uptdate does not really work 
// app.post("/dashbord/:id", (req, res) => {
//   console.log("dashbordPost", req.body)
//   const _id = req.params.id;
//   User.findOne({ _id })
//   .then(user => {
//   if (!user) {
//   return res.status(404).json({ error: "User not found" });
//   }
//   const name = user.name;
//   Posts.findOneAndUpdate({ userId: _id }, { avatar: req.body.avatar }, { new: true })
//   .then(post => {
//   if (!post) {
//   return res.status(404).json({ error: "Post not found" });
//   }
//   console.log("post", post)
//   const avatar = post.avatar;
//   req.session.user = { _id, name, avatar };
//   res.render("dashbord", { _id, name, avatar });
//   })
//   .catch(error => {
//   res.status(500).json({ error: error });
//   });
//   })
// })


app.listen(PORT, console.log(`Server started on port ${PORT}`))