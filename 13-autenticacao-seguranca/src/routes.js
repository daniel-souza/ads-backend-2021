//const { Router } = require("express");
import { Router } from "express";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";

import authMiddleware from "./middlewares/auth.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

/* Users */

// GET /users > Listar usuários
// /users?page=1&limit=10
routes.get("/users", UserController.list);
// GET /users/:id > Listar um usuário
routes.get("/users/:id", UserController.listOne);
// POST /users > Criar um usuário
routes.post("/users", UserController.create);
// PUT /users/:id > Atualizar um usuário
routes.put("/users/:id", authMiddleware, UserController.update);
// DELETE /users/:id > Deletar um usuário
routes.delete("/users/:id", authMiddleware, UserController.delete);

/* Login */
routes.post("/login", LoginController.login);

/* Me (usuário autenticado) */
routes.get("/me", authMiddleware, UserController.listMe);
routes.put("/me", authMiddleware, UserController.updateMe);
routes.delete("/me", authMiddleware, UserController.deleteMe);

//module.exports = routes;
export default routes;