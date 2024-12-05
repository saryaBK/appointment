import { del } from "../api/delete";

export const Delete_appointment= async (id) => {
  return await del({ path: `customer_appointment/${id}` });
};