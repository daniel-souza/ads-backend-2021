const express = require("express");

const app = express();

// Dados
const contatos = ["Daniel", "Kelly", "Jessica", "Marcos"];

/**
 * Middlewares
 */ 
app.use(bodyParser.json());
/*
app.use((req, res, next) => {
  console.log("Acessou o nosso Middleware!");
  next();
});
*/

function validarContato(req, res, next) {
  if(!req.body.nome) {
    return res.status(400).json({
      error: "Necessário eviar o nome!"
    });
  }
  return next();
}

// contatos/:id
function validarPosContato(req, res, next) {
  if(!contatos[req.params.id]) {
    return res.status(400).json({
      error: "Contato não encontrado!"
    });
  }
  return next();
}

/**
 * rotas
 */
app.get("/", function(req, res) {
  res.send("Olá mundo!");
});

// função anônima :: arrow function
//(param1, param2) => { instrucoes }; 
app.get("/contato", (req, res) => {
  res.send("Página de contato 3!");
});

app.get("/contato/:id", validarPosContato, (req, res) => {
  const { id } = req.params;
  const { sit } = req.query;
  return res.json({
    id,
    nome: "Daniel Souza",
    sit
  })
});

// endpoint: /contatos
// GET: Listar contatos
app.get("/contatos", (req, res) => {
  return res.json(contatos);
});

// endpoint: /contatos/3
// GET: Listar um contato por id
app.get("/contatos/:id", validarPosContato, (req, res) => {
  const { id } = req.params;
  return res.json({
    nome: contatos[id]
  });
});

// endpoint: /contatos
// POST: Cadastrar novo contato
app.post("/contatos", validarContato, (req, res) => {
  
  const nome = req.body.nome;
  contatos.push(nome);
  return res.json(contatos);

});

// endpoint: /contatos/id
// PUT: Editar um contato por id
app.put("/contatos/:id", validarPosContato, validarContato, (req, res) => {
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
app.delete("/contatos/:id", validarPosContato, (req, res) => {
  const { id } = req.params;
  contatos.splice(id,1);
  return res.json(contatos);
});

app.listen(3000, function() {
  console.log("Servidor iniciado na porta 3000!");
});