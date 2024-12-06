import { post } from "../api/post";

export const postLogIn = async (data) => {
    return await post({ path: `sign_in`, sendData: data });
};

export const postSignOut = async () => {
    return await post({ path: `sign_out`, sendData: {} });
};

export const postSignUp = async (data) => {
    return await post({ path: `sign_up`, sendData: data });
};

export const postCustomerAppointment = async (data) => {
    return await post({ path: `customer_appointment`, sendData: data });
};