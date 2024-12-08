import { put } from "../api/put";

export const editAccount = async ({data}) => {
  return await put({ path: `account`, sendData: data });
};

