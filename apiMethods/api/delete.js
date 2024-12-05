import AsyncStorage from "@react-native-async-storage/async-storage";
import { InfoConfig } from "./api_config";
import Toast from "react-native-toast-message"; 
import { t } from "i18next";
const { baseUrl,Authentication,id } = InfoConfig();

export const del = async ({ path,sendData}) => {
var headers = {
Authorization:Authentication ,
};
var s_id = await AsyncStorage.getItem('s_id');
var jwt = await AsyncStorage.getItem('jwt');
if (s_id) {
headers.s_id = s_id;
}
if (jwt) {
headers.jwt = jwt;
}
try {
    const res = await fetch(`${baseUrl}${id}/${path}`, {
    headers: headers,
    method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
    if (data.meta && data.meta.errors) {
        Object.keys(data.meta.errors).map((err) => {
            Toast.show({
            type: "error",
            text1: (`${err}: ${data.meta.errors[err]}`),
            });
        });
        } else {
        Toast.show({
            type: "error",
            text1: t("fail"),
        });
        }
    if (data?.meta?.user_logged_in == false) {
        LogOut();
    }
    return null;
    }
    if (data && data.meta && data.meta.message) {
    Toast.show({
        type: "success",
        text1: (data.meta.message),
    });
    }

    return { res, data };
} catch (e) {
    return null;
}
};