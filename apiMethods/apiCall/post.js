import { post } from "../api/post";

export const postLogIn = async (data) => {
    return await post({ path: `sign_in`, sendData: data });
};