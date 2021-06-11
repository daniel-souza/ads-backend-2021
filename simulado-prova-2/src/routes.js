import { Router } from "express";
import UserController from "./controllers/UserController.js";
import ProfileController from "./controllers/ProfileController.js";
import SignController from "./controllers/SignController.js";

import authMiddleware from "./middlewares/auth.js";

const routes = new Router();

ProfileController
// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

/* Sign */
routes.post('/login', SignController.login); // signin
routes.post('/signup', SignController.signup);

/* profile (usuário autenticado) -> possui req.userID adicionado pelo authMiddleware */
// GET /profile > Listar usuário logado
routes.get("/profile", authMiddleware, ProfileController.list);
// PUT /profile > Editar usuário logado
routes.put("/profile", authMiddleware, ProfileController.update);
// DELETE /profile > Deletar usuário logado
routes.delete("/profile", authMiddleware, ProfileController.delete);

/* Rotas aninhadas - posts do usuário logado */
// GET /profile/posts > Listar posts do usuário logado
routes.get('/profile/posts', authMiddleware, ProfileController.listPosts);
// GET /profile/posts/:post_id > Listar um post do usuário logado
routes.get('/profile/posts/:post_id', authMiddleware, ProfileController.listOnePost);
// POST /profile/posts > Adicionar novo post ao usuário logado
routes.post('/profile/posts', authMiddleware, ProfileController.addPost);
// PUT /profile/posts/:post_id > Editar um post do usuário logado
routes.put('/profile/posts/:post_id', authMiddleware, ProfileController.updatePost);
// DELETE /profile/posts/:post_id > Deletar um post do usuário logado
routes.delete('/profile/posts/:post_id', authMiddleware, ProfileController.deletePost);

// Rotas de acesso público

// GET /users > Listar usuários
routes.get('/users', UserController.list);
// GET /users/:user_id > Listar um usuário
routes.get('/users/:user_id', UserController.listOne);
// GET /users/:user_id > Listar posts de um usuário
routes.get('/users/:user_id/posts', UserController.listPosts);
// GET /users/:user_id > Listar um post de um usuário
routes.get('/users/:user_id/posts/:post_id', UserController.listOnePost);

// 404 - Page/Resource Not Found
routes.use((req, res, next) => {
  return res.status(404).json({
      error: true,
      message: `Resource '${req.url}' Not Found!`
  });
});

// 500 - Internal Server Error
routes.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).json({
      errror: true,
      message: "Internal Server Error"
  });
});

export default routes;