import http from "http";
import { v4 as uuidv4 } from "uuid";

const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type,Authorization,Content-Length,X-Resqueted-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH,POST,GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

const todos = [{ title: "test data 1", content: "mock test data" }];

const requestListenter = (req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", data: todos }));
    res.end();
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("hello");
    res.end();
  }
};

const server = http.createServer(requestListenter);
server.listen(process.env.PORT || 3005);
