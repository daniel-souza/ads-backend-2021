//const { Router } = require("express");
import { Router } from "express";
import bcrypt from 'bcrypt';

import SignController from "./controllers/SignController.js";
import authorize from "./middlewares/AuthMiddleware.js";
import UserModel from "./models/UserModel.js";
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
routes.get('/profile', authorize(), ProfileController.delete);
// produtos do usuário logado
routes.get('/profile/produtos', authorize(), ProfileController.listProducts);
routes.get('/profile/produtos/:product_id', authorize(), ProfileController.listOneProduct);
routes.post('/profile/produtos', authorize(), ProfileController.addProduct);
routes.put('/profile/produtos/:product_id', authorize(), ProfileController.updateProduct);
routes.delete('/profile/produtos/:product_id', authorize(), ProfileController.deleteProduct);
// comentários de produtos do usuário logado
routes.get('/profile/produtos/:product_id/comentarios', authorize(), ProfileController.listProductComments);
routes.get('/profile/produtos/:product_id/comentarios/:comment_id', authorize(), ProfileController.listOneProductComment);
routes.post('/profile/produtos/:product_id/comentarios', authorize(), ProfileController.addProductComment);
routes.put('/profile/produtos/:product_id/comentarios/:comment_id', authorize(), ProfileController.updateProductComment);
routes.delete('/profile/produtos/:product_id/comentarios/:comment_id', authorize(), ProfileController.deleteProductComment);

// rotas públicas
routes.get('/usuarios', UserController.list)
routes.get('/usuarios/:user_id', UserController.listOne)
routes.get('/usuarios/:user_id/produtos', UserController.listProducts)
routes.get('/usuarios/:user_id/produtos/:product_id', UserController.listOneProduct)
routes.get('/usuarios/:user_id/produtos/:product_id/comentarios', UserController.listProductComments)
routes.get('/usuarios/:user_id/produtos/:product_id/comentarios/:comment_id', UserController.listOneProductComment)

// rotas privadas
routes.post('/usuarios/:user_id/produtos/:product_id/comentarios', authorize(), UserController.addProductComment);
routes.put('/usuarios/:user_id/produtos/:product_id/comentarios/:comment_id', authorize(), UserController.updateProductComment);
routes.delete('/usuarios/:user_id/produtos/:product_id/comentarios/:comment_id', authorize(), UserController.deleteProductComment);

routes.use((err, req, res, next) => {
    console.log(err)
    return res.sendStatus(500);
});

//module.exports = routes;
export default routes;