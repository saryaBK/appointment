import { ONEDAY_CONFIG } from '../../src/onedayConfig/OneDayApiConfig'
const { Authorization , mainUrl,id } = ONEDAY_CONFIG()
const Info = {
  baseUrl: mainUrl,
  id: id,
  Authentication: Authorization
};

// module.exports = { ...Info };

export const TestEnv = process.env.NODE_ENV == "development";

export const InfoConfig = () => {
  return Info;
};
