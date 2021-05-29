const express = require("express");

const app = express();

// Dados
const Pets = [
    {
        name: "Golias",
        type: "Dog",
        Owners: [
            {
                name: "Ana",
                sex: "F"
            },
            {
                name: "Beto",
                sex: "M"
            }
        ]
    },
    {
        name: "Hulk",
        type: "Parrot",
        Owners: [
            {
                name: "Caio",
                sex: "M"
            },
            {
                name: "Dani",
                sex: "F"
            }
        ]
    },
];

/**
 * Middlewares
 */ 
app.use(express.json());

// GET /pets - Listar todos os pets.
app.get("/pets", async function listar(req, res) {
    return res.json({ Pets });
});
// GET /pets/:pid - Listar um pet.
app.get("/pets/:pid", async function listarUmPet(req, res) {
    return res.json({ Pet: Pets[req.params.pid] });
});
// POST /pets - Criar novo Pet.
app.post("/pets", async function cadastrarPet(req, res) {
    Pets.push(req.body);
    return res.json({Pets});
});
// PUT /pets/:pid - Editar um Pet.
app.put("/pets/:pid", async function editarUmPet(req, res) {
    if (req.body.name)
        Pets[req.params.pid].name = req.body.name;
    if (req.body.type)
        Pets[req.params.pid].type = req.body.type;
    
    return res.json({ Pet: Pets[req.params.pid] });
});
// Delete /pets/:pid - Deletar um Pet.
app.delete("/pets/:pid", async function deletarUmPet(req, res) {
    Pets.splice(req.params.pid, 1);
    return res.json(Pets);
});

// GET /pets/:pid/owners - Listar todos os proprietários de um Pet.
app.get("/pets/:pid/owners", async function listarPropDeUmPet(req, res) {
    return res.json( {
        Pet_id: req.params.pid,
        Owners: Pets[req.params.pid].Owners
    } );
});
// GET /pets/:pid/owners/:oid - Listar um proprietário de um Pet.
app.get("/pets/:pid/owners/:oid", async function listarUmPropDeUmPet(req, res) {
    return res.json({
        Owner: Pets[req.params.pid].Owners[req.params.oid]
    });
});
// POST /pets/:pid/owners - Criar novo Proprietário de um pet.
app.post("/pets/:pid/owners", async function cadastrarPropDeUmPet(req, res) {
    if(!Pets[req.params.pid].Owners)
        Pets[req.params.pid].Owners = [];
    
    Pets[req.params.pid].Owners.push(req.body);
    return res.json({ Onwers: Pets[req.params.pid].Owners });
});
// PUT /pets/:pid/owners/:oid - Editar um proprietário de um pet.
app.put("/pets/:pid/owners/:oid", async function editarPropDeUmPet(req, res) {
    if(req.body.name)
        Pets[req.params.pid].Owners[req.params.oid].name = req.body.name;
    if(req.body.sex)
        Pets[req.params.pid].Owners[req.params.oid].sex = req.body.sex;
    
    return res.json({ Owner: Pets[req.params.pid].Owners[req.params.oid] });
});
// Delete /pets/:pid/owners/:oid - Deletar um proprietário de um Pet.
app.delete("/pets/:pid/owners/:oid", async function deletarPropDeUmPet(req, res) {
    Pets[req.params.pid].Owners.splice(req.params.oid, 1);
    return res.json({
        Owners: Pets[req.params.pid].Owners
    });
});

app.listen(3000, function() {
  console.log("Servidor iniciado na porta 3000!");
});