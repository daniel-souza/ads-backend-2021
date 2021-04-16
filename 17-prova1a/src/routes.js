//const { Router } = require("express");
import { Router } from "express";
const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

/* Criar as rotas  */
// GET /empregados > Listar usuários
// GET /empregados/:id > Listar um usuário
// POST /empregados > Criar um usuário
// PUT /empregados/:id > Atualizar um usuário
// DELETE /empregados/:id > Deletar um usuário

//module.exports = routes;
export default routes;