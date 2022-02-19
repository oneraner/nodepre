import headers from "./server";

const errorCodeList = [400];

const errorResContent = code => {
  switch (code) {
    case 400:
      return JSON.stringify({
        status: "false",
        message: "欄位未填寫正確，或無此 todo id",
      });
    default:
      return JSON.stringify({
        status: "false",
        message: "意外的錯誤",
      });
  }
};

const handleError = (res, code) => {
  if (!errorCodeList.includes(code)) return;
  res.writeHead(code, headers);
  res.write(errorResContent(code));
};
export default handleError;
