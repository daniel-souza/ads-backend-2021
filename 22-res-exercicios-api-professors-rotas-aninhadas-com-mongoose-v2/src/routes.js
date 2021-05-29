//const { Router } = require("express");
import { Router } from "express";

import UserController from "./controllers/UserController.js";

import Pet from "./models/Pet.js";
import Professor from "./models/Professor.js";

const routes = new Router();


// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// GET /users > Listar usuários
routes.get("/users", UserController.list);
// GET /users/:id > Listar um usuário
routes.get("/users/:id", UserController.listOne);
// POST /users > Criar um usuário
routes.post("/users", UserController.create);
// PUT /users/:id > Atualizar um usuário
routes.put("/users/:id", UserController.update);
// DELETE /users/:id > Deletar um usuário
routes.delete("/users/:id", UserController.delete);


// Rotas de professors
// GET /professors - Listar todos os professors
routes.get("/professors", async (req, res) => {

    Professor.find({}).then((professors)=> { // sucesso
        return res.json({ // status 200 ok
            error: false,
            professors: professors
        })
    }).catch((err) => { // erro
        return res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!"
        })
    });
});
// GET /professors/:pid - Listar um pet
routes.get("/professors/:pid", async (req, res) => {
    Professor.findById(req.params.pid).then((professor) => { // sucesso
        return res.json({
            error: false,
            professor
        })
    }).catch((err) => { // erro
        return res.status(400).json({
            error: true,
            message: "Erro, professor não encontrado!"
        })
    });
});

// POST /professors
routes.post("/professors", async (req, res) => {
    Professor.create(req.body).then((professor) => { // sucesso
        res.json({
            error: false,
            professor
        })
    }).catch((err) => { // erro
        console.log(err.name)
        console.log(err.message)
        if(err.name === "ValidationError") {
            return res.status(400).json({
                error: true,
                message: err.message,
                ValidationError: err.errors
            });
        }

        return res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!"
        });
    })
});

// PUT /professors/:pid
routes.put("/professors/:pid", async (req, res) => {
    Professor.updateOne({_id: req.params.pid}, req.body).then(() => { // sucesso
        return res.json({
            error: false,
            message: "Professor atualizado com sucesso!"
        });
    }).catch((err) => { // erro
        console.log(err.name)
        console.log(err.message)

        if(err.name === "CastError") {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }

        if(err.name === "ValidationError") {
            return res.status(400).json({
                error: true,
                message: err.message,
                ValidationError: err.errors
            });
        }

        return res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!"
        });
        
    });
});

// DELETE /professors/:pid
routes.delete("/professors/:pid", async (req, res) => {
    Professor.deleteOne({_id: req.params.pid}).then(() => { // sucesso
        return res.json({ // status 200 ok
            error: false,
            message: "Professor deletado com sucesso!"
        });
    }).catch((err) => { // erro
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!"
        });
    });
});

// Aulas (classes) de um Professor (professor universitário)

// GET /professors/:pid/owners - Listar todos as aulas de um professor
routes.get("/professors/:pid/classes", async (req, res) => {
    try {
        const professorExiste = await Professor.findById(req.params.pid);
        if(!professorExiste) {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        return res.json({classes: professorExiste.classes});
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Erro a executar esta solicitação!"
            })
        }
    }
    
});

// GET /professors/:pid/classes/:cid - Listar uma aula de um professor
routes.get("/professors/:pid/classes/:cid", async (req, res) => {
    try {
        const professorExiste = await Professor.findById(req.params.pid);
        if(!professorExiste) {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        const classExist = ProfessorExiste.classes.id(req.params.cid);
        if(!classExist) {
            return res.status(400).json({
                error: true,
                message: "Aula não encontrada!"
            });
        }

        res.json({
            error: false,
            class: classExist
        });
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                error_code: 101,
                message: "Professor não encontrado!"
            });
        }
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Erro a executar esta solicitação!"
            })
        }
    }
});

// POST /professors/:pid/classes - Cadastrar nova aula de um Professor.
/*
{
    name: "Aula 1",
    description: "Introdução a APIs"
}
*/
routes.post("/professors/:pid/classes", async (req, res) => {
    try {
        const professorExiste = await Professor.findById(req.params.pid);
        if(!professorExiste) {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        const qtdeDeAulas = professorExiste.classes.push(req.body);
        professorExiste.save((err) => { //const err = professorExiste.validateSync()
            console.log(err);
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }
        
            // Não havendo erro, então
            return res.json({ // status: 200 ok
                error: false,
                class: professorExiste.classes[qtdeDeAulas-1]
            })
        });
    }  catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Erro a executar esta solicitação!"
            })
        }
    }
});

// PUT /professors/:pid/classes/:cid - Editar uma aula de um Professor
routes.put("/professors/:pid/classes/:cid", async (req, res) => {
    try {
        const professorExiste = await Professor.findById(req.params.pid);
        if(!professorExiste) {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        
        if(!professorExiste.classes.id(req.params.cid)) {
            return res.status(400).json({
                error: true,
                message: "Aula não encontrada!"
            });
        }
        if(req.body.name) {
            professorExiste.classes.id(req.params.cid).name = req.body.name;
        }
        if(req.body.description) {
            professorExiste.classes.id(req.params.cid).description = req.body.description;
        }
        professorExiste.save((err) => { //const err = professorExiste.validateSync()
            console.log(err);
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }
        
            // Não havendo erro, então
            return res.json({ // status: 200 ok
                error: false,
                class: professorExiste.classes.id(req.params.cid)
            })
        });
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Erro a executar esta solicitação!"
            })
        }
    }

});

// DELETE /professors/:pid/classes/:cid - Deletar uma aula de um professor
routes.delete("/professors/:pid/classes/:cid", async (req, res) => {
    try {
        const professorExiste = await Professor.findById(req.params.pid);
        if(!professorExiste) {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        
        if(!professorExiste.class.id(req.params.cid)) {
            return res.status(400).json({
                error: true,
                message: "Aula não encontrado!"
            });
        }

        professorExiste.class.id(req.params.cid).remove();
        petExiste.save( (err) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                });
            }

            return res.json({
                error: false,
                message: "Aula deletada com sucesso!"
            })

        });
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Professor não encontrado!"
            });
        }
        if(err) {
            return res.status(400).json({
                error: true,
                message: "Erro a executar esta solicitação!"
            })
        }
    }
});

//module.exports = routes;
export default routes;