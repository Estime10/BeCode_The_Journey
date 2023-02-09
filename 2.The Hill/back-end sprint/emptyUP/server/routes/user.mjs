import  Express from "express"
import  {getUsers, createUser}  from "../controllers/users.mjs"
const router = Express.Router()

router.use( (req, res, next) =>{
    console.log( req )
    next()
})



router
.get(getUsers)
.post(createUser)
.put(( req, res ) =>{})

// router
// ("/:id")
// .get(( req, res ) =>{})
// .delete(( req, res ) =>{});
router

export default router