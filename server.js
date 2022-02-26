import http from "http";
import { postTodos, getTodos, deleteTodos, updateTodos } from "./todosApi.js";
import { handleError } from "./error.js";
import defaultHeaders from "./corsHeaders.js";

const requestListenter = (req, res) => {
  if (req.method === "GET") {
    const handleResquest = () => {
      switch (req.url) {
        case "/todos":
          return getTodos();
        case "/":
          return { code: 200, defaultHeaders, content: "服務正常運作中" };
        default:
          handleError(404, res);
          return;
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
        res.writeHead(404, defaultHeaders);
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
      if (req.url.startsWith("/todos")) {
        return deleteTodos(req, res);
      } else {
        handleError(404, res);
        return;
      }
    };
    const resquest = handleResquest();
    if (resquest) {
      res.writeHead(resquest.code, resquest.headers);
      res.write(JSON.stringify(resquest.content));
      res.end();
    }
  }
  res.end();
};

const server = http.createServer(requestListenter);
server.listen(process.env.PORT || 3005);
