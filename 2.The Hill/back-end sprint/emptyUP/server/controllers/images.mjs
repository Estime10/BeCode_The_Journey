import { pool } from "../models/dbPool.mjs";
import { v2 as cloudinary } from "cloudinary";



export const uploadImage = async (req, res) => {
    const file  = await req.files.image
    console.log(file)
    if(!file){
        res.status(500).json({error: "file missing"})
    }
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath)
        const admin_id = req.userId
        const building = await pool.query("select id from buildings where admin_id = $1", [admin_id])
        const building_id = building.rows[0].id
        const date = new Date()
        await pool.query("insert into images (cloudinary_id, image_url, building_id, dateofpost) values ($1, $2, $3, $4)",
        [result.public_id, result.secure_url, building_id, date])
        return res.send({ info: "image succesfully uploaded" })

    }catch (error) {
        console.log(error)
        res.status(500).send({ error: "invalid request" });
      }

}



