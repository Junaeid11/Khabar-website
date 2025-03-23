import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { messageService } from "./m.service";

const createSubscription = catchAsync(async (req, res) => {
    const data = req.body;

    const result = await messageService.createSubscription(data)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Subscribed Successfully",
        data: result
    })
})
const getAllMessage = catchAsync(async (req, res) => {

    const result = await messageService.getAllMessage(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "message fetched successfully",
        data: result

    })
})

export const messageController = {
  getAllMessage,
  createSubscription
}