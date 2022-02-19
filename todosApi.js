import todos from "./todoData.js";
import { headers } from "./server.js";
import handleError from "./error.js";
import { v4 as uuidv4 } from "uuid";

export const getTodos = () => ({ code: 200, headers, content: todos });

export const postTodos = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      if (!data.title || !data.content) {
        const errorObfect = handleError(400);
        res.writeHead(errorObfect.code, errorObfect.headers);
        res.write(JSON.stringify(errorObfect.content));
        res.end();
        return;
      }
      todos.push({ ...data, id: uuidv4() });
      res.writeHead(200, headers);
      res.write(JSON.stringify(todos));
      res.end();
    } catch {
      const errorObfect = handleError(400);
      res.writeHead(errorObfect.code, errorObfect.headers);
      res.write(JSON.stringify(errorObfect.content));
      res.end();
    }
  });
};

export const updateTodos = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      if (!data.id || !data.title) {
        const errorObfect = handleError(400);
        res.writeHead(errorObfect.code, errorObfect.headers);
        res.write(JSON.stringify(errorObfect.content));
        res.end();
        return;
      }
      const index = todos.findIndex(todo => todo.id === data.id);
      todos.splice(index, 1, data);
      res.writeHead(200, headers);
      res.write(JSON.stringify(todos));
      res.end();
    } catch {
      const errorObfect = handleError(400);
      res.writeHead(errorObfect.code, errorObfect.headers);
      res.write(JSON.stringify(errorObfect.content));
      res.end();
    }
  });
};

export const deleteTodos = (req, res) => {
  const id = req.url.split("/").pop();
  if (id === "all") {
    todos.length = 0;
    return { code: 200, headers, content: todos };
  }
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return handleError(400);
  } else {
    todos.splice(index, 1);
    return { code: 200, headers, content: todos };
  }
};

export default getTodos;
