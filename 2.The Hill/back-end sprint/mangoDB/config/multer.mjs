import multer from "multer";

 export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_"+ Date.now() +"_"+ file.originalname)
    },
});

export const upload = multer({ storage: storage }).single("image");

