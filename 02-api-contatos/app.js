const express = require("express");
const app = express();

// Dados
const contatos = ["Daniel", "Kelly", "Jessica", "Marcos"];

app.use(express.json());

app.get("/", function(req, res) {
  res.send("Olá mundo!");
});

// endpoint: /contatos
// GET: Listar contatos
app.get("/contatos", (req, res) => {
  return res.json(contatos);
});

// endpoint: /contatos/3
// GET: Listar um contato por id
app.get("/contatos/:id", (req, res) => {
  const { id } = req.params;
  return res.json({
    nome: contatos[id]
  });
});

// endpoint: /contatos
// POST: Cadastrar novo contato
app.post("/contatos", (req, res) => {
  
  const nome = req.body.nome;
  contatos.push(nome);
  return res.json(contatos);

});

// endpoint: /contatos/id
// PUT: Editar um contato por id
app.put("/contatos/:id", (req, res) => {
  const { id } = req.params;
  const nome = req.body.nome;
  contatos[id] = nome;

  return res.json({
    id: id,
    nome: contatos[id]
  });

});

// endpoint: /contatos/id
// DELETE: Deletar um contato por id
app.delete("/contatos/:id", (req, res) => {
  const { id } = req.params;
  contatos.splice(id,1);
  return res.json(contatos);
});

app.listen(3000, function() {
  console.log("Servidor iniciado na porta 3000!");
});