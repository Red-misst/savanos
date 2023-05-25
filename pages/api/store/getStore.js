import nc from "next-connect"
import db from "@/utils/db"
import Store from "@/models/Store"
import auth from "@/middleware/auth"

const handler = nc().use(auth)

handler.get(async (req, res) => {
    try{
    await db.connectDb()
    const store = await Store.findOne({ user: req.user._id })
    await db.disconnectDb()
    res.json(store)
    } catch (error){
        console.log(error)
        res.status(500).send({message: 'Error in Fetching Store'})
    }
})
export default handler