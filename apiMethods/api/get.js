import AsyncStorage from "@react-native-async-storage/async-storage";
import { InfoConfig } from "./api_config";
import i18next from "i18next";
const { baseUrl,Authentication,id } = InfoConfig();

export const get = async ({ path, sendRes}) => {
  var headers = {
    Authorization: Authentication
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
    const res = await fetch(`${`${baseUrl}${id}/${path}`}`, {
      headers:headers,
    });
    const data = await res.json();
    
    if (sendRes && data) {
      return { res, data };
    } else if (data) {
      return data;
    }
  } catch (e) {
    return null;
  }
};
