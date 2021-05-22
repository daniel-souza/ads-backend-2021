//const { Router } = require("express");
import { Router } from "express";

import UserController from "./controllers/UserController.js";

import Pet from "./models/Pet.js";

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


// Rotas de pets
// GET /pets - Listar todos os pets
routes.get("/pets", async (req, res) => {
    Pet.find({}).then((pets)=> { // sucesso
        res.json({ // status 200 ok
            error: false,
            Pets: pets
        })
    }).catch((err) => { // erro
        res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!"
        })
    });
});
// GET /pets/:pid - Listar um pet
routes.get("/pets/:pid", async (req, res) => {
    Pet.findById(req.params.pid).then((pet) => { // sucesso
        res.json({
            error: false,
            Pet: pet
        })
    }).catch((err) => { // erro
        res.status(400).json({
            error: true,
            message: "Erro, peto não encontrado!"
        })
    });
});

// POST /pets
routes.post("/pets", async (req, res) => {
    Pet.create(req.body).then((pet) => { // sucesso
        res.json({
            error: false,
            Pet: pet
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

// PUT /pets/:pid
routes.put("/pets/:pid", async (req, res) => {
    Pet.updateOne({_id: req.params.pid}, req.body).then(() => { // sucesso
        return res.json({
            error: false,
            message: "Pet atualizado com sucesso!"
        });
    }).catch((err) => { // erro
        console.log(err.name)
        console.log(err.message)

        if(err.name === "CastError") {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
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

// DELETE /pets/:pid
routes.delete("/pets/:pid", async (req, res) => {
    Pet.deleteOne({_id: req.params.pid}).then(() => { // sucesso
        res.json({ // status 200 ok
            error: false,
            message: "Pet deletado com sucesso!"
        });
    }).catch((err) => { // erro
        console.log(err)
        res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!"
        });
    });
});

// Proprietários de um Pet

// GET /pets/:pid/owners - Listar todos os proprietários de um pet
routes.get("/pets/:pid/owners", async (req, res) => {
    try {
        const petExiste = await Pet.findById(req.params.pid);
        if(!petExiste) {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
            });
        }
        return res.json({owners: petExiste.owners});
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
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

// GET /pets/:pid/owners/:oid - Listar um proprietário de um pet
routes.get("/pets/:pid/owners/:oid", async (req, res) => {
    try {
        const petExiste = await Pet.findById(req.params.pid);
        if(!petExiste) {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
            });
        }
        const ownerExist = petExiste.owners.id(req.params.oid);
        if(!ownerExist) {
            return res.status(400).json({
                error: true,
                message: "Proprietário não encontrado!"
            });
        }

        res.json({
            error: false,
            onwer: ownerExist
        });
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                error_code: 101,
                message: "Pet não encontrado!"
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

// POST /pets/:pid/owners - Cadastrar novo proprietário de um Pet.
/*
{
    name: "Proprietaria 1",
    sex: "F"
}
*/
routes.post("/pets/:pid/owners", async (req, res) => {
    try {
        const petExiste = await Pet.findById(req.params.pid);
        if(!petExiste) {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
            });
        }
        const totalOnwers = petExiste.owners.push(req.body);
        petExiste.save((err) => { //const err = petExiste.validateSync()
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
                owner: petExiste.owners[totalOnwers-1]
            })
        });
    }  catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
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

// PUT /pets/:pid/owners/:oid - Editar um proprietário de um Pet
routes.put("/pets/:pid/owners/:oid", async (req, res) => {
    try {
        const petExiste = await Pet.findById(req.params.pid);
        if(!petExiste) {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
            });
        }
        
        if(!petExiste.owners.id(req.params.oid)) {
            return res.status(400).json({
                error: true,
                message: "Proprietário não encontrado!"
            });
        }
        if(req.body.name) {
            petExiste.owners.id(req.params.oid).name = req.body.name;
        }
        if(req.body.sex) {
            petExiste.owners.id(req.params.oid).sex = req.body.sex;
        }
        petExiste.save((err) => { //const err = petExiste.validateSync()
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
                owner: petExiste.owners.id(req.params.oid)
            })
        });
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
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

// DELETE /pets/:pid/owners/:oid - Deletar um proprietário de um Pet
routes.delete("/pets/:pid/owners/:oid", async (req, res) => {
    try {
        const petExiste = await Pet.findById(req.params.pid);
        if(!petExiste) {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
            });
        }
        
        if(!petExiste.owners.id(req.params.oid)) {
            return res.status(400).json({
                error: true,
                message: "Proprietário não encontrado!"
            });
        }

        petExiste.owners.id(req.params.oid).remove();
        petExiste.save( (err) => {
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                });
            }

            return res.json({
                error: false,
                message: "Proprietário deletado com sucesso!"
            })

        });
    } catch(err) {
        if(err.name === 'CastError') {
            return res.status(400).json({
                error: true,
                message: "Pet não encontrado!"
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