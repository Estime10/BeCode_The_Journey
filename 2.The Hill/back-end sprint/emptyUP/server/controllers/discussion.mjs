import { pool } from "../models/Client.mjs"

// Discussions

<<<<<<< HEAD:server/controllers/discussion.mjs
export const createDiscussion = async (req, res) => {
    const user1 = req.decoded
    const user2 = req.params.id
    const user_id = [ user1, user2]
    if( !user1 || !user2 ){
        return res.status(400).send({error :" no user found"})
=======

export const getDiscussion = async (req, res) => {
    // const user1 = req.userId; 
    // if(!user1){
    //     return res.status(401).send({error: "not authorized"})
    // }
    try{
        const result1 = await pool.query('SELECT discussion.id, discussion.user_1, discussion.user_2, users.username, users.profilpicture_url FROM discussion LEFT JOIN users ON discussion.user_1 = users.id')
        const result2 = await pool.query('SELECT discussion.id, discussion.user_1, discussion.user_2, users.username, users.profilpicture_url FROM discussion LEFT JOIN users ON discussion.user_2 = users.id')
        res.status(200).json({ data: result2.rows})
    }catch(error){
        console.error(error);
        res.status(500).send({ error: "server error" });
>>>>>>> 1cf883fbca3abfd8057f1b2902bae7b096552ba6:server/controllers/discussions.mjs
    }

} 

export const createDiscussion = async (req, res) => {
    console.log(req.body)
    console.log(req.body.username)
    const user1 = req.userId
    console.log(user1)
    const user2 = req.body.username
    const hours = (new Date().getHours() + " : " + new Date().getMinutes()) 
    const date = new Date() + hours 

    try{
    const user = await pool.query("SELECT id FROM users WHERE username = $1", [user2] )
    console.log(user.rows[0].id)
    await pool.query("INSERT INTO discussion (user_1, user_2) values ($1, $2)",
    [user1, user.rows[0].id])

    return res.status(201).send({info : "discussion succesfully created"})

    }catch(error){
    console.error(error)
    return res.status(500).send({error : "internal server error"})
    }
}


export const addLastMessageAsContent = async (req, res) => { 
    const user1 = req.userId
    const user2 = req.params.id
    const user_id = user1 || user2
    if( !user1 || !user2){
        return res.status(400).send({error :" no user found"})
    } try {
        const content = await pool.query(
            "SELECT content FROM messages ORDER BY id DESC LIMIT 1 where user_id = $1",
            [user_id]
        )

    } catch(error) {

    }

}


export const deleteDiscussion = async (req, res) => {
    const discussion_id = req.params.id    // => dans le endpoint donner le id de la discussion qu'on veut supprimer 
    const user = req.userId
    const user_id = await pool.query("select user_id from discussion where id = $1",
    [discussion_id])
    if(user === user_id.rows[0].user_id){
        try{
            await pool.query("delete from discussion where id = $1",
            [discussion_id])
            return res.status(201).send({ message : 'Discussion deleted succesfully'})

        }catch(error){
            console.error(error)
            return res.status(500).send({ error : 'Internal server error'})

        }
    } else {
        return res.status(404).send({ error :'user not authorized'})
    }
}