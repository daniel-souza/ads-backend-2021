const express = require("express");

const app = express();

// Dados
const Professors = [
    {
        name: "Daniel",
        sex: 'M',
        classes: [
            {
                name: "Aula 01",
                desc: "Introdução ao Backend"
            },
            {
                name: "Aula 02",
                desc: "Entendendo APIs REST"
            }
        ],
    },
    {
        name: "Júlia",
        sex: "F",
        classes: [
            {
                name: "Aula 01",
                desc: "Noções de GIT"
            }
        ]
    }
];

/**
 * Middlewares
 */ 
app.use(express.json());


// GET /professors - Listar todos os profs.
app.get("/professors", async function listarProfs(req, res) {
    console.log("Listar professores")
    return res.json({Professors});
});
// GET /professors/:pid - Listar um professor.
app.get("/professors/:pid", async function listarUmProf(req, res) {
    return res.json({
        Professor: Professors[req.params.pid]
    })
});
// POST /professors - Cadastrar novo professor.
app.post("/professors", async function cadastrarNovoProf(req, res) {
    console.log(req.body)
    Professors.push(req.body);
    return res.json({Professors});
});
// PUT /professors/:pid - Editar um professor.
app.put("/professors/:pid",  async function editarUmProf(req, res) {
    if(!Professors[req.params.pid]) 
        res.status(400).json({
            message: "Professor não encontrado."
        });
    if(req.body.name)
        Professors[req.params.pid].name = req.body.name;
    if(req.body.sex)
        Professors[req.params.pid].sex = req.body.sex;
    
    return res.json({
        Professor: Professors[req.params.pid],
        message: "Professor editado com sucesso!"
    })
});
// DELETE /professors/:pid - Deletar um professor.
app.delete("/professors/:pid", async function deletarUmProf(req, res) {
    Professors.splice(req.params.pid, 1);
    return res.json({
        Professors,
        message: "Professor deletado com sucesso!"
    });
});

// GET /professors/:pid/classes - Listar todas as aulas de um professor.
app.get("/professors/:pid/classes", async function listarAulasDeUmProf(req, res) {
    return res.json({Classes: Professors[req.params.pid].classes});
});
// GET /professors/:pid/classes/:cid - Listar uma aula de um professor.
app.get("/professors/:pid/classes/:cid", async function listarAulasDeUmProf(req, res) {
    return res.json({
        Class: Professors[req.params.pid].classes[req.params.cid]
    });
});
// POST /professors/:pid/classes - Cadastrar nova aula de um professor.
app.post("/professors/:pid/classes", async function cadastrarNovaAulaDeUmProf(req, res) {
    if(!Professors[req.params.pid].classes)
        Professors[req.params.pid].classes = [];
    Professors[req.params.pid].classes.push(req.body);
    return res.json(Professors[req.params.pid].classes);
});
// PUT /professors/:pid/classes/:cid - Editar uma aula de um professor.
app.put("/professors/:pid/classes/:cid", async function editarAulaDeUmProf(req, res) {
    if(req.body.nome)
        Professors[req.params.pid]
            .classes[req.params.cid].nome = req.body.nome;
    if(req.body.desc)
        Professors[req.params.pid]
            .classes[req.params.cid].desc = req.body.desc;
    return res.json({
        Class: Professors[req.params.pid]
            .classes[req.params.cid],
        message: "Aula editada com sucesso!"
    });
});
// DELETE /professors/:pid/classes/:cid - DELETAR uma aula de um professor.
app.delete("/professors/:pid/classes/:cid", async function deletarUmaAulaDeUmProf(req, res) {
    Professors[req.params.pid]
            .classes.splice(req.params.cid, 1);
    return res.json({
        Classes: Professors[req.params.pid].classes,
        message: "Aula deletada com sucesso!"
    });
});
app.listen(3000, function() {
  console.log("Servidor iniciado na porta 3000!");
});