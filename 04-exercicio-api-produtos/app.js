const express = require("express");

const app = express();

const produtos = [
  {
    nome: "Inspiron",
    marca: "Dell",
    tipo: "Eletrônico",
  },
  {
    nome: "S10",
    marca: "Samsung",
    tipo: "Eletrônico"
  },
  {
    nome: "Caderno",
    marca: "Tilibra",
    tipo: "Escolar"
  },
  {
    nome: "Caneta azul 7mm",
    marca: "BIC",
    tipo: "Escolar"
  }
];

/**
 * Middlewares
 */
app.use(express.json());
/**
 * Implementar os middlewares de validação aqui.
 */

/**
 * Implementar as seguintes rotas.
 * GET    /produtos     > Listar todos os produtos
 * GET    /produtos/:id > Listar um produto
 * POST   /produtos     > Criar novo produto
 * PUT    /produtos/:id > Atualizar um produto
 * DELETE /produtos/:id > Deletar um produto
 */

 // inicia servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});
