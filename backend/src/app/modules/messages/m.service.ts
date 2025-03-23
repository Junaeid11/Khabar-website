import { TMessage } from "./m.interface";
import { Contact } from "./m.model";

const createMessage = async (payload: TMessage) => {
    const result = await Contact.create(payload);
    return result

}
const getAllMessage = async (query: Record<string, unknown>) => {
    const result = await Contact.find(query); 
    return result;
  };
export const messageService = {
    createMessage,
 getAllMessage

}