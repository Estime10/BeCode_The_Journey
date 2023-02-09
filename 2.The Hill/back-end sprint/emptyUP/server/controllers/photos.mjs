import { pool } from "../models/Client.mjs"
import cloudinary from "../middleware/cloudinary.mjs"


export const uploadImage = async (req, res) => {
        const file = await req.files.image
        try{
            const result = await cloudinary.uploader.upload( file.tempFilePath )
            console.log(result.public_id)
            const public_id = result.public_id
            const admin_id = "3" //req.decoded
            const building = await pool.query("SELECT id FROM buildings WHERE admin_id = $1", [admin_id])
            const building_id = building.rows[0].id
            const date = new Date()
            await pool.query(
                "INSERT INTO images (cloudinary_id, image_url, building_id, dateofpost) VALUES ($1, $2, $3,$4) ",
                [public_id, result.secure_url, building_id, date]
            )
            return res.send({ info: "image uploaded succesfuly" })

        }   catch ( err ) { 
            console.error( err.message )
        }
    }
        

// delete image
export const deleteUploadImage = async ( req, res ) =>{
    try{
        const { id } = req.params
        const deleteImage = await pool.query(
            "DELETE FROM images WHERE id = $1",
            [id]
        )
        res.json("Image has been deleted!")
    } catch ( err ) {
        console.error(err.message)
    }
}