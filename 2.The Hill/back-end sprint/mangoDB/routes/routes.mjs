// import express from "express";
// const router = express.Router();
// import Posts from "../models/posts.mjs";
// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/uploads");
//         },
//         filename: function (req, file, cb) {
//         cb(null, file.fieldname + "_"+ Date.now() +"_"+ file.originalname)
//         },
//     });

// const upload = multer({ storage: storage,
//  }).single("image");

// insert into database successfully
// router.post("/test", upload, ( req, res ) =>{
//     const user = new Posts({
//         userId: req.body.userId,
//         avatar: req.file.filename,
       
//     });
//     user.save((err) =>{
//         if(err){
//             res.json({ message: err.message, type: "danger" })
//         } else {
//             res.redirect("/test");
//         }
//     })
// })





// // router.get("/test", (req, res) => {
//     res.render("test");
// // });

export default router;


                         