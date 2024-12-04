import { get } from "../api/get";

export const getBranch= async ({lang}) => {
  return await get({ path: `branch?language=${lang}` });
};

export const getBranchById= async ({lang,id}) => {
  return await get({ path: `branch/${id}?language=${lang}` });
};

export const getEmployeeById= async ({lang,id}) => {
  return await get({ path: `employee/${id}?language=${lang}` });
};
// available_appointment?employee=27&date=2024-12-13

export const getAvailableAppointment= async ({id,date}) => {
  return await get({ path: `available_appointment?employee=${id}&date=${date}` });
};

export const getAccount= async () => {
  return await get({ path:`account`});
};