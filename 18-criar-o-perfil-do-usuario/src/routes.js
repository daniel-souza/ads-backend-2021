//const { Router } = require("express");
import { Router } from "express";

import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import User from "./models/User.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// GET /users > Listar usuários
// /users?page=1&limit=10
routes.get("/users", UserController.list);
// GET /users/:id > Listar um usuário
routes.get("/users/:id", UserController.listOne);
// POST /users > Criar um usuário
routes.post("/users", UserController.create);
// PUT /users/:id > Atualizar um usuário
routes.put("/users/:id", UserController.update);
// DELETE /users/:id > Deletar um usuário
routes.delete("/users/:id", UserController.delete); 

// Autenticacao
// GET POST PUT DELETE
routes.post("/login", LoginController.login);

// Rotas do perfil do usuário autenticado.
// GET /profile - Listar o perfil do usuário autenticado.
routes.get("/profile", authMiddleware, async function list(req, res) {
    User.findOne({ _id: req.userID }).select("nome email -_id").then((usuario) => {
        return res.json({
            error: false,
            user: usuario
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível executar a solicitação!"
        })
    })
});
// PUT /profile - Editar o perfil do usuário autenticado.
routes.put("/profile", authMiddleware, async function update(req, res) {
    User.findOneAndUpdate({ _id: req.userID }, req.body, { new: true }).then((updatedUser) => {
        return res.json({
            error: false,
            user: updatedUser
        })
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível executar a solicitação!"
        })
    });
});
// DELETE /profile - Deletar o usuário autenticado.
routes.delete("/profile", authMiddleware, async function deletar(req, res) {
    User.deleteOne({_id: req.userID}).then(() => {
        return res.json({
            error: false,
            message: "Usuário deletado com sucesso!"
        })
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível executar a solicitação!"
        })
    });
});
//module.exports = routes;
export default routes;