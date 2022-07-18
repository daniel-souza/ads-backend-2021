//const { Router } = require("express");
import { Router } from "express";

import SignController from "./controllers/SignController.js";
import authorize from "./middlewares/AuthMiddleware.js";
import ProfileController from "./controllers/ProfileController.js";
import UserController from "./controllers/UserController.js";
const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// SignController
routes.post('/signup', SignController.signUp);
routes.post('/signin', SignController.signIn);

// rotas privadas
/* listar usuário logado */
routes.get('/profile', authorize(), ProfileController.list);
/* editar usuário logado */
routes.put('/profile', authorize(), ProfileController.update);
/* deletar usuário logado */
routes.delete('/profile', authorize(), ProfileController.delete);
// produtos do usuário logado
routes.get('/profile/products', authorize(), ProfileController.listProducts);
routes.get('/profile/products/:product_id', authorize(), ProfileController.listOneProduct);
routes.post('/profile/products', authorize(), ProfileController.addProduct);
routes.put('/profile/products/:product_id', authorize(), ProfileController.updateProduct);
routes.delete('/profile/products/:product_id', authorize(), ProfileController.deleteProduct);
// comentários de produtos do usuário logado
routes.get('/profile/products/:product_id/comments', authorize(), ProfileController.listProductComments);
routes.get('/profile/products/:product_id/comments/:comment_id', authorize(), ProfileController.listOneProductComment);
routes.post('/profile/products/:product_id/comments', authorize(), ProfileController.addProductComment);
routes.put('/profile/products/:product_id/comments/:comment_id', authorize(), ProfileController.updateProductComment);
routes.delete('/profile/products/:product_id/comments/:comment_id', authorize(), ProfileController.deleteProductComment);

// rotas públicas
routes.get('/users', UserController.list);
routes.get('/users/:user_id', UserController.listOne);
routes.get('/users/:user_id/products', UserController.listProducts);
routes.get('/users/:user_id/products/:product_id', UserController.listOneProduct);
routes.get('/users/:user_id/products/:product_id/comments', UserController.listProductComments);
routes.get('/users/:user_id/products/:product_id/comments/:comment_id', UserController.listOneProductComment);

// rotas privadas - Usuário autenticado pode inserir, editar e deletar seus próprios comentários em produtos de outros usuários, além de si mesmo.
routes.post('/users/:user_id/products/:product_id/comments', authorize(), UserController.addProductComment);
routes.put('/users/:user_id/products/:product_id/comments/:comment_id', authorize(), UserController.updateProductComment);
routes.delete('/users/:user_id/products/:product_id/comments/:comment_id', authorize(), UserController.deleteProductComment);

// exception
routes.use((err, req, res, next) => {
    console.log(err)
    return res.sendStatus(500);
});

//module.exports = routes;
export default routes;