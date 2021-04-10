//const { Router } = require("express");
import { Router } from "express";

import ProductController from "./controllers/ProductController.js";
import authMiddleware from "./middlewares/auth.js";
import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

/**
 * Icluir o middleware authMiddleware nas rotas de produtos, para garantir que essas
 * operações sejam realizadas apenas a usuários autenticados.
 */

// GET /products > Listar produtos
// /products?page=1&limit=10
routes.get("/products", ProductController.list);
// GET /products/:id > Listar um produto
routes.get("/products/:id", ProductController.listOne);
// POST /products > Criar um produto
routes.post("/products", ProductController.create);
// PUT /products/:id > Atualizar um produto
routes.put("/products/:id", ProductController.update);
// DELETE /products/:id > Deletar um produto
routes.delete("/products/:id", ProductController.delete); 

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