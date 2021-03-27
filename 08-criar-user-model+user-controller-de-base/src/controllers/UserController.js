//const User = require("../models/User");
import User from "../models/User.js";

class UserController {
    // GET /users > Listar usuários
    async list(req, res) {
        return res.json({
            message: "TODO - Listar usuários"
        });
    }
    // GET /users/:id > Listar um usuário
    async listOne(req, res) {
        return res.json({
            message: "TODO - Listar um usuário"
        });
    }
    // POST /users
    async create(req, res) {
        return res.json({
            message: "TODO - Criar um usuário"
        });
    }
    // PUT /users/:id
    async update(req, res) {
        return res.json({
            message: "TODO - Atualizar um usuário"
        });
    }
    // DELETE /users/:id
    async delete(req, res) {
        return res.json({
            message: "TODO - Deletar um usuário"
        });
    }
}

//module.exports = new UserController();
export default new UserController();