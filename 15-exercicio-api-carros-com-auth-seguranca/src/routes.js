//const { Router } = require("express");
import { Router } from "express";

import authMiddleware from "./middlewares/auth.js";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

/**
 * 1. Criar as rotas de carros, conforme especificações do exercício
 * 2. Icluir o middleware authMiddleware nas rotas de carros, para garantir que essas
 * operações sejam realizadas apenas a usuários autenticados.
 */


/* Login */
/** Criar a rota de login com o método post. */

/* User */
routes.post("/users", UserController.create);

/**
 * Se a autenticação estiver funcionando adequadamente, pode utilizar essas rotas como teste.
 */

/* Me (usuário autenticado) */
routes.get("/me", authMiddleware, UserController.listMe);
routes.put("/me", authMiddleware, UserController.updateMe);
routes.delete("/me", authMiddleware, UserController.deleteMe);

//module.exports = routes;
export default routes;