import defaultHeaders from "./corsHeaders.js";

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

export const handleError = (code, res) => {
  if (!errorCodeList.includes(code)) return;
  res.writeHead(code, defaultHeaders);
  res.write(JSON.stringify(errorResContent(code)));
  res.end();
};
export default handleError;
