import http from "http";
import { postTodos, getTodos, deleteTodos, updateTodos } from "./todosApi.js";
import { handleError } from "./error.js";

export const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type,Authorization,Content-Length,X-Resqueted-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH,POST,GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

const requestListenter = (req, res) => {
  if (req.method === "GET") {
    const handleResquest = () => {
      switch (req.url) {
        case "/todos":
          return getTodos();
        case "/":
          return { code: 200, headers, content: "服務正常運作中" };
        default:
          return handleError(404);
      }
    };
    const resquest = handleResquest();
    res.writeHead(resquest.code, resquest.headers);
    res.write(JSON.stringify(resquest.content));
    res.end();
  } else if (req.method === "POST" || req.method === "PATCH") {
    switch (req.url) {
      case "/todos":
        if (req.method === "POST") {
          return postTodos(req, res);
        } else {
          return updateTodos(req, res);
        }

      default:
        res.writeHead(404, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "無對應路由",
          })
        );
        res.end();
    }
  } else if (req.method === "DELETE") {
    const handleResquest = () => {
      if (req.url.startsWith("/todo")) {
        return deleteTodos(req, res);
      } else {
        return handleError(404);
      }
    };
    const resquest = handleResquest();
    res.writeHead(resquest.code, resquest.headers);
    res.write(JSON.stringify(resquest.content));
    res.end();
  }
  res.end();
};

const server = http.createServer(requestListenter);
server.listen(process.env.PORT || 3005);
