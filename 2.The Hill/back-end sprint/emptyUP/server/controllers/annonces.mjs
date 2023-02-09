import { pool } from "../models/Client.mjs"

export const postAnnonces = async (req, res) => {
  const { content, subject, city } = req.body;
  const date = new Date();
  const user_id = req.userId;

  if (!content) {
    return res.status(400).send({ error: "no text entered" });
  }

  try {
    const query = await pool.query(
      "insert into annonces (user_id,content, date, subject, city) values ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, content, date, subject, city]
    );
    return res.send({ message: "announce correctly added" });
  } catch (error) {
    if (error.code === "23505") {
      // i added "unique" constraint to "content" in the table like that it will check automaticly if the announcement is already in the database
      return res.status(400).send({ error: "annonce already exist" });
    }
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

export const getAllAnnonces = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT annonces.id, annonces.content, annonces.date, annonces.subject, annonces.city, users.username, users.profilpicture_url FROM annonces LEFT JOIN users ON annonces.user_id = users.id"
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No data to be displayed" });
    }
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "server error" });
  }
};

export const getOneAnnonce = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send("no id provided");
  }
  try {
    const query = await pool.query("SELECT * FROM annonces WHERE id = $1", [
      id,
    ]);
    if (query.rows.length === 0) {
      return res.status(404).send("no announcement found");
    }
    return res.status(200).json(query.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteAnnonce = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const user_id = req.userId;
  console.log(user_id)
  const verif = await pool.query("SELECT user_id from annonces where id = $1", [
    id]);
  if (verif.rows[0].user_id !== user_id) {
    return res.status(400).send({ info: "not authorized" });
  }
  try {
    const result = await pool.query("SELECT * FROM annonces WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: "announcement not found" });
    }
    await pool.query("DELETE FROM annonces WHERE id = $1", [id]);
    return res.status(200).send({ message: "announcement deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateAnnonce = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "no announcement" });
  }
  try {
    await pool.query("update annonces set content = $1 where id = $2", [
      content,
      id,
    ]);
    return res.statu(200).send("announcement modified");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error!" });
  }
};
