import { headers } from "./server.js";

const errorCodeList = [400, 404];
const errorResContent = code => {
  switch (code) {
    case 400:
      return {
        status: "false",
        message: "欄位未填寫正確，或無此 todo id",
      };
    case 404:
      return {
        status: "false",
        message: "無對應路由",
      };
    default:
      return {
        status: "false",
        message: "意外的錯誤",
      };
  }
};

export const handleError = code => {
  if (!errorCodeList.includes(code)) return;
  return { code, headers, content: errorResContent(code) };
};
export default handleError;
