import express from "express"
import expressEjsLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import flash from "connect-flash"
import session from "express-session"
import dotenv from "dotenv"
import passport from "passport" 
import passportConfig from './config/passport.mjs'
import multer from "multer"
import bodyParser from "body-parser"
import { getLogin, postLogin } from './controllers/login.mjs';
import { getRegister, postRegister } from './controllers/register.mjs';
import { getAvatar, postAvatar } from './controllers/avatar.mjs';
import { getDashbord, postDashbord } from './controllers/dashbord.mjs';

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
app.get("/", (req, res)=>{res.render("welcome")})
app.get("/login", getLogin);
app.post("/login", postLogin);
app.get("/register", getRegister);
app.post("/register", postRegister);
app.get("/dashbord", getDashbord);
app.post("/dashbord/:id", postDashbord);
app.get("/avatar/:id", getAvatar);
app.post("/avatar/:id", upload, postAvatar);



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