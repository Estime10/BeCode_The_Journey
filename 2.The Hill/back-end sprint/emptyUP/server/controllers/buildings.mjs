import { pool } from "../models/Client.mjs"
// Buildings

<<<<<<< HEAD
// get all buildings
export const getBuildings = async ( req, res ) =>{
    try {
        const allbuildings = await pool.query(
            "SELECT * FROM buildings"
            )
            res.json(allbuildings.rows)
    } catch (err) {
        console.error(err.message)
    }
}


//get one building by ID
export const oneBuilding = async ( req, res ) =>{
const { id } = req.params
try {
    const building  = await pool.query(
        "SELECT * FROM buildings WHERE id = $1", 
        [id]
    )
    res.json(building.rows[0])
} catch (err) {
    console.error(err.message)
}
}

//get one building by zipcode
export const getZipcode = async (req, res) => {
try {
  const building = await pool.query("SELECT * FROM buildings WHERE zipcode = $1", [req.params.zipcode])
  if (building.rows.length === 0) {
    res.status(404).json({ message: "No building found with this zipcode" })
  } else {
    res.json(building.rows);
=======
//************** */ Get buildings from the admin_id
export const getUserAdminBuildings = async (req, res) => {
  const user_id = req.params.id
  console.log(user_id); 
  try {
    const result = await pool.query(
      "SELECT * FROM buildings where admin_id = $1 ",
      [user_id]
    );

    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "invalid request" });
  }
}; 

////////////// GET ALL the buildings  */
export const getBuildings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM buildings");

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No data to be displayed" });
    }
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(400).send({ error: "invalid request" });
  }
};

//////////// Get building from his ID */
export const getOneBuilding = async (req, res) => {
  const building_id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM buildings WHERE id = $1", [
      building_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No data to be displayed" });
    }
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(400).send({ error: "invalid request" });
  }
};

////////////// retrieve building.s by infos in the body (filtering) */

export const getBuildingby = async (req, res) => {
  const { adress, zipcode, city, type } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM buildings WHERE adress = $1 OR zipcode = $2 OR city = $3 OR type = $4",
      [adress, zipcode, city, type]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    if (error.code === "42P01") {
      return res.status(404).json({ error: "Table not found" });
    }
    res.status(400).json({ error: "Bad request" });
  }
};

//get one building by zipcode///////////////////
export const getZipcode = async (req, res) => {
  try {
    const building = await pool.query(
      "SELECT * FROM buildings WHERE zipcode = $1",
      [req.params.zipcode]
    );
    if (building.rows.length === 0) {
      res.status(404).json({ message: "No building found with this zipcode" });
    } else {
      res.json(building.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get one building by city //////////////////
export const getCity = async (req, res) => {
  try {
    const building = await pool.query(
      "SELECT * FROM buildings WHERE city = $1",
      [req.params.city]
    );
    if (building.rows.length === 0) {
      res.status(404).json({ message: "No building found with this city" });
    } else {
      res.json(building.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////get one building by adress need to find a way to retrieve full adresses
export const getAdress = async (req, res) => {
  try {
    const building = await pool.query(
      "SELECT * FROM buildings WHERE adress = $1",
      [req.params.adress]
    );
    if (building.rows.length === 0) {
      res.status(404).json({ message: "No building found with this adress" });
    } else {
      res.json(building.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//// get building by type****************************************************
export const getType = async (req, res) => {
  try {
    const building = await pool.query(
      "SELECT * FROM buildings WHERE type = $1",
      [req.params.type]
    );
    if(req.params.type === "All"){
     const building = await pool.query(
        "SELECT * FROM buildings",
     );
     return res.json(building.rows)
    }
    if (building.rows.length === 0) {
      res.status(404).json({ message: "No building found with this type" });
    } else {
      res.json(building.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

////////////////////// ADD a building in the database */
export const addBuilding = async (req, res) => {
  const { adress, zipcode, city, type, lat, lon } = req.body;

  const file = req.files.image;
  const dateofpost = new Date();
  const user_id = req.userId;
  const admin_id = user_id;

  if (user_id !== req.userId) {
    res.status(401).json({ error: "user unhautorized" });
  }
  if (!adress || !zipcode || !city || !type) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const initialImage = result.secure_url;
    console.log(initialImage);
    await pool.query(
      "insert into buildings (adress, zipcode, city, type, dateofpost, admin_id, initial_image, lat, lon) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        adress,
        zipcode,
        city,
        type,
        dateofpost,
        admin_id,
        initialImage,
        lat,
        lon,
      ]
    );
    return res.status(201).send({ info: "building successfully added" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "invalid request" });
  }
};

////////////////// UPDATE infos of a building  */
export const updateBuilding = async (req, res) => {
  try {
    const id = req.params;
    const { adress, zipcode, city, type } = req.userId;
    const update = await pool.query(
      "UPDATE buildings SET adress = $1, zipcode = $2, city = $3, type = $4 WHERE id = $5",
      [adress, zipcode, city, type, id]
    );
    res.json("building updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error updating building ");
  }
};

////////////////// delete a building from the database  */
export const deleteBuilding = async (req, res) => {
  const id = req.params.id;
  const admin_id = req.userId;
  const verif = await pool.query(
    "SELECT admin_id from buildings where id = $1",
    [id]
  );
  if (verif.rows[0].user_id !== admin_id) {
    return res.status(400).send({ info: "not authorized" });
  }
  try {
    await pool.query("DELETE FROM buildings WHERE id = $1", [id]);
    return res.status(200).send({ message: "building deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
>>>>>>> 1cf883fbca3abfd8057f1b2902bae7b096552ba6
  }
} catch (err) {
  console.error(err.message);
  res.status(500).json({ message: "Internal Server Error" })
}
}

// get one building by city
export const getCity = async (req, res) => {
try {
  const building = await pool.query("SELECT * FROM buildings WHERE city = $1", [req.params.city]);
  if (building.rows.length === 0) {
    res.status(404).json({ message: "No building found with this city" });
  } else {
    res.json(building.rows)
  }
} catch (err) {
  console.error(err.message)
  res.status(500).json({ message: "Internal Server Error" });
}
}

//get one building by adress need to find a way to retrieve full adresses
export const getAdress = async (req, res) => {
try {
  const building = await pool.query("SELECT * FROM buildings WHERE adress = $1", [req.params.adress]);
  if (building.rows.length === 0) {
    res.status(404).json({ message: "No building found with this adress" });
  } else {
    res.json(building.rows)
  }
} catch (err) {
  console.error(err.message)
  res.status(500).json({ message: "Internal Server Error" });
}
}

//create a building
export const createOneBuilding = async ( req, res ) =>{
try {
    const { adress, zipcode, city, type } = req.body
    // const dateofpost = Date.now() needs to be set
    const dateofpost = new Date
    const admin_id = "3"
    const initial_image = "heehheheheheheh"
    
    
    if ( !adress || !zipcode || !city || !type ) {
      return res.status(400).json({ error: "Missing parameters" })
    }
    const newBuilding = await pool.query (
        "INSERT INTO buildings ( adress, zipcode, city, type, dateofpost, admin_id, initial_image) VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [ adress, zipcode, city, type, dateofpost, admin_id, initial_image ]
    )
    res.json(newBuilding.rows[0])
} catch ( err ) {
    console.error( err.message )
}
}

// update a building 
export const updateBuilding = async (req, res) => {
  try {
      const { id } = req.params
      const { adress, zipcode, city, type } = req.body;
      const update = await pool.query(
          "UPDATE buildings SET adress = $1, zipcode = $2, city = $3, type = $4 WHERE id = $5", 
          [adress, zipcode, city, type, id ]
      )
      res.json("building updated successfully")
  } catch (err) {
      console.error(err.message)
      res.status(500).json("Error updating building ")
  }
}

//delete a building
export const deleteBuilding =  async ( req, res ) =>{
try {
    const { id } = req.params
    const deleteBuilding =  await pool.query(
        "DELETE FROM buildings WHERE id = $1",
        [id]
    )
    res.json("building has been deleted!")
} catch (err) {
    console.error(err.message)
}
}

