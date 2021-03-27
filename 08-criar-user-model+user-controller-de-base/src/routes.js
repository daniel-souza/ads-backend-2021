//const { Router } = require("express");
import { Router } from "express";
import UserController from "./controllers/UserController.js";
const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// GET /users > Listar usuários
routes.get("/users", UserController.list);
// GET /users/:id > Listar um usuário
routes.get("/users/:id", UserController.listOne);
// POST /users > Criar um usuário
routes.post("/users", UserController.create);
// PUT /users/:id > Atualizar um usuário
routes.put("/users/:id", UserController.update);
// DELETE /users/:id > Deletar um usuário
routes.delete("/users/:id", UserController.delete); 

//module.exports = routes;
export default routes;