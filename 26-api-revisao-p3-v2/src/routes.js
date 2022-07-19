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

/**
 * Há duas formas de utilizar o middleware de autorização:
 * 1. authorize(): Significa que qualquer usuário autenticado está autorizado a utilizar dada rota.
 * 2. authorize(["User", "Admin"]): Significa que qualquer um dos usuários especificados na lista estão autorizados a utilizar dada rota.
 */

// rotas privadas apenas de usuários comuns
/* listar usuário logado */
routes.get('/profile', authorize(), ProfileController.list);
/* editar usuário logado */
routes.put('/profile', authorize(), ProfileController.update);
/* deletar usuário logado - Um admin não pode deletar a si mesmo */
routes.delete('/profile', authorize(["User"]), ProfileController.delete);
// produtos do usuário logado - apenas usuários comuns acessam essas rotas
routes.get('/profile/products', authorize(["User"]), ProfileController.listProducts);
routes.get('/profile/products/:product_id', authorize(["User"]), ProfileController.listOneProduct);
routes.post('/profile/products', authorize(["User"]), ProfileController.addProduct);
routes.put('/profile/products/:product_id', authorize(["User"]), ProfileController.updateProduct);
routes.delete('/profile/products/:product_id', authorize(["User"]), ProfileController.deleteProduct);
// comentários de produtos do usuário logado
routes.get('/profile/products/:product_id/comments', authorize(["User"]), ProfileController.listProductComments);
routes.get('/profile/products/:product_id/comments/:comment_id', authorize(["User"]), ProfileController.listOneProductComment);
routes.post('/profile/products/:product_id/comments', authorize(["User"]), ProfileController.addProductComment);
routes.put('/profile/products/:product_id/comments/:comment_id', authorize(["User"]), ProfileController.updateProductComment);
routes.delete('/profile/products/:product_id/comments/:comment_id', authorize(["User"]), ProfileController.deleteProductComment);

// rotas públicas
routes.get('/users', UserController.list);
routes.get('/users/:user_id', UserController.listOne);
routes.get('/users/:user_id/products', UserController.listProducts);
routes.get('/users/:user_id/products/:product_id', UserController.listOneProduct);
routes.get('/users/:user_id/products/:product_id/comments', UserController.listProductComments);
routes.get('/users/:user_id/products/:product_id/comments/:comment_id', UserController.listOneProductComment);

// rotas privadas - Usuário autenticado pode inserir, editar e deletar seus próprios comentários em produtos de outros usuários, além de si mesmo.
//                - Admins podem inserir o seu próprio comentário, além de editar e deletar comentários de outros usuários.
routes.post('/users/:user_id/products/:product_id/comments', authorize(["User", "Admin"]), UserController.addProductComment);
routes.put('/users/:user_id/products/:product_id/comments/:comment_id', authorize(["User", "Admin"]), UserController.updateProductComment);
routes.delete('/users/:user_id/products/:product_id/comments/:comment_id', authorize(["User", "Admin"]), UserController.deleteProductComment);

// exception 404 - Not Found
routes.use(async (req, res, next) =>
    res.status(404).json({ error: true, message: `Resource ${req.url} not found!` })
);

// Tratamento de exceções centralizado, se não tratado, lançar status 500 - Internal server error.
routes.use(async (err, req, res, next) => {
    console.log(err)
    if (err.name === "ValidationError")
        return res.status(400).json({
            error: true,
            message: err.message,
            ValidationError: err.errors
        });
    // MongoDB error code - quando há valor duplicado, dado à restrição de unicidade de um atributo
    if(err.code === 11000)
        return res.status(400).json({
            error: true,
            message: `This value already exists!`,
            duplicated: err.keyValue
        });
    // se o usuário definiu lançou algum erro para ser tratado de forma centralizada
    // Exemplo: Throw new Error({status: 400, message: "Requisição inválida!"}) ou next(new Error(...))
    if(err.status)
        return res.status(err.status).json({ error: true, message: err.message })
    // Caso alguma excessão não for tratada anterioriormente, lançar Internal server error.
    return res.status(500).json({ error: true, message: "Internal server error!" })
});

//module.exports = routes;
export default routes;