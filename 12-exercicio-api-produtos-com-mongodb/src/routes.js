//const { Router } = require("express");
import { Router } from "express";
import ProductController from "./controllers/ProductController.js";
const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

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

//module.exports = routes;
export default routes;