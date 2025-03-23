import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { messageService } from "./m.service";

const createMessage = catchAsync(async (req, res) => {
    const authorData = req.body;

    const result = await messageService.createMessage(authorData)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "message created Successfully",
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
  createMessage
}