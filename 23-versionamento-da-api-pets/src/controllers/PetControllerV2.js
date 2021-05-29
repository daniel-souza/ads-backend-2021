import Pet from "../models/PetV2.js";

class PetControllerV2 {
    // GET /pets - Listar todos os Pets
    async list(req, res) {
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
    }
    // GET /pets/:pid - Listar um Pet.
    async listOne(req, res) {
        Pet.findById(req.params.pid).then((pet) => { // sucesso
            res.json({
                error: false,
                Pet: pet
            })
        }).catch((err) => { // erro
            res.status(400).json({
                error: true,
                message: "Erro, pet não encontrado!"
            })
        });
    }
    // POST /pets - Cadastrar novo Pet.
    async create(req, res) {
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
        });
    }
    // PUT /pets/:pid - Editar um Pet.
    async update(req, res) {
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
    }   
    // DELETE /pets/:pid
    async delete(req, res) {
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
    }

    /* Rotas aninhadas - Onwers */
    // GET /pets/:pid/owners - Listar proprietários de um pet.
    async listOnwers(req, res) {
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
    }
    // GET /pets/:pid/owners/:oid - Listar um prop. de um pet.
    async listOneOwner(req, res) {
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
    }
    // POST /pets/:pid/owners - Adicionar proprietário de um pet.
    async addOnwer(req, res) {
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
    }
    // PUT /pets/:pid/owners/:oid - Editar proprietário de um pet.
    async updateOwner(req, res) {
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
    }
    // DELETE /pets/:pid/owners/:oid - Deletar um prop. de um pet.
    async deleteOwner(req, res) {
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
    }
}

export default new PetControllerV2(); 