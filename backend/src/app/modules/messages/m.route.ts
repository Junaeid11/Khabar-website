
import Express from "express"
import { messageController } from "./m.controller"

const router = Express.Router()
router.post('/me',  messageController.createMessage)
router.get('/me',  messageController.getAllMessage)
export const messageRoute = router 