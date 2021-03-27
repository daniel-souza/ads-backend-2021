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

// Middlewares
app.use(express.json());

const validarCadastroProduto = function(req, res, next) {
  const { nome, marca, tipo } = req.body;
  if(!nome || !marca || !tipo) {
    return res.status(400).json({
      error: "Necessário informar o nome, a marca e o tipo!"
    });
  }
  return next();
}

const validarAtualizacaoProduto = function(req, res, next) {
  const { nome, marca, tipo } = req.body;
  if(!nome && !marca && !tipo) {
    return res.status(400).json({
      error: "Necessário informar pelo menos um dos campos nome, marca ou tipo!"
    });
  }
  return next();
}

// /produtos/:id
const validarPosicaoProduto = function(req, res, next) {
  if(!produtos[req.params.id]) {
    return res.status(400).json({
      error: "Produto não encontrado!"
    })
  }
  return next();
}

// CRUD

// GET Listar todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// GET Listar um produto
app.get("/produtos/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id: produtos[id]
  })
});

//POST Criar novo produto
app.post("/produtos", validarCadastroProduto, (req, res) => {
  const { nome, marca, tipo } = req.body;
  
  produtos.push({
    nome,
    marca,
    tipo
  });

  res.json(produtos);
});

// PUT Atualizar um produto
app.put("/produtos/:id", validarPosicaoProduto, validarAtualizacaoProduto, (req, res) => {
  const { id } = req.params;
  const { nome, marca, tipo } = req.body;
  console.log(req.body);

  if(nome)  produtos[id].nome = nome;
  if(marca) produtos[id].marca = marca;
  if(tipo)  produtos[id].tipo = tipo;

  return res.json(produtos);
});

// DELETE Deletar um produto
app.delete("/produtos/:id", validarPosicaoProduto, (req, res) => {
    const { id } = req.params;
    produtos.splice(id, 1);
    return res.json(produtos);
});

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});