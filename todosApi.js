import todos from "./todoData.js";
import defaultHeaders from "./corsHeaders.js";
import handleError from "./error.js";
import { v4 as uuidv4 } from "uuid";

export const getTodos = () => ({
  code: 200,
  headers: defaultHeaders,
  content: todos,
});

export const postTodos = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      if (!data.title || !data.content) {
        handleError(400, res);
        return;
      }
      todos.push({ ...data, id: uuidv4() });
      res.writeHead(200, defaultHeaders);
      res.write(JSON.stringify(todos));
      res.end();
    } catch {
      handleError(400, res);
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
        handleError(400, res);
        return;
      }
      const index = todos.findIndex(todo => todo.id === data.id);
      if (index === -1) {
        handleError(400, res);
        return;
      }
      todos.splice(index, 1, data);
      res.writeHead(200, defaultHeaders);
      res.write(JSON.stringify(todos));
      res.end();
    } catch {
      handleError(400, res);
      return;
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
    handleError(400, res);
    return;
  } else {
    todos.splice(index, 1);
    return { code: 200, headers, content: todos };
  }
};

export default getTodos;
