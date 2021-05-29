import Pets from "../models/PetV1.js";

class PetControllerV1 {
    // GET /pets - Listar todos os Pets
    async list(req, res) {
        return res.json({ pets: Pets });
    }
    // GET /pets/:pid - Listar um Pet.
    async listOne(req, res) {
        console.log("v1 listOne??? pid: " + req.params.pid)
        return res.json({ pet: Pets[req.params.pid] });
    }
    // POST /pets - Cadastrar novo Pet.
    async create(req, res) {
        Pets.push(req.body);
        return res.json({pets: Pets});
    }
    // PUT /pets/:pid - Editar um Pet.
    async update(req, res) {
        if (req.body.name)
            Pets[req.params.pid].name = req.body.name;
        if (req.body.type)
            Pets[req.params.pid].type = req.body.type;
        
        return res.json({ pet: Pets[req.params.pid] });
    }   
    // DELETE /pets/:pid
    async delete(req, res) {
        Pets.splice(req.params.pid, 1);
        return res.json(Pets);
    }

    /* Rotas aninhadas - Onwers */
    // GET /pets/:pid/owners - Listar proprietários de um pet.
    async listOnwers(req, res) {
        return res.json({
            owners: Pets[req.params.pid].owners
        });
    }
    // GET /pets/:pid/owners/:oid - Listar um prop. de um pet.
    async listOneOwner(req, res) {
        return res.json({
            owner: Pets[req.params.pid].owners[req.params.oid]
        });
    }
    // POST /pets/:pid/owners - Adicionar proprietário de um pet.
    async addOnwer(req, res) {
        //if(!Pets[req.params.pid].owners)
           // Pets[req.params.pid].owners = [];
    
        Pets[req.params.pid].owners.push(req.body);
        return res.json({ onwers: Pets[req.params.pid].owners });
    }
    // PUT /pets/:pid/owners/:oid - Editar proprietário de um pet.
    async updateOwner(req, res) {
        if(req.body.name)
            Pets[req.params.pid].owners[req.params.oid].name = req.body.name;
        if(req.body.sex)
            Pets[req.params.pid].owners[req.params.oid].sex = req.body.sex;
        
        return res.json({ owner: Pets[req.params.pid].owners[req.params.oid] });
    }
    // DELETE /pets/:pid/owners/:oid - Deletar um prop. de um pet.
    async deleteOwner(req, res) {
        Pets[req.params.pid].owners.splice(req.params.oid, 1);
        return res.json({
            owners: Pets[req.params.pid].owners
        });
    }
}

export default new PetControllerV1(); 