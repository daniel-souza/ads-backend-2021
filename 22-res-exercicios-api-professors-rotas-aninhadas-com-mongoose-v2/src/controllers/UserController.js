//const User = require("../models/User");
import User from "../models/User.js";

class UserController {
    // GET /users > Listar usuários
    // errors code: 100..109
    async list(req, res) {
        // consultar no banco os usuários
        User.find({}).select("-senha").then((users) => {
            return res.json({
                error: false,
                users: users
            });
        }).catch((error) => {
            return res.status(400).json({
                error: true,
                code: 100,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
        }
    // GET /users/:id > Listar um usuário
    // errors code: 110..119
    async listOne(req, res) {
        User.findOne({ _id: req.params.id }, '_id nome email createAt updateAt').then((user) => {
            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 110,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }
    // POST /users
    // errors code: 120..129
    async create(req, res) {
        User.create(req.body).then((user) => {
            return res.json(user);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 120,
                message: "Error: Usuário não foi cadastrado com sucesso"
            });
        });
    }
    // PUT /users/:id
    // errors code: 130..139
    async update(req, res) {
        const user = req.body;
        User.updateOne({_id: req.params.id}, user).then(() => {
            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 130,
                message: "Erro: Usuário não foi editado com sucesso!"
            });
        });
    }
    // DELETE /users/:id
    // errors code: 140..149
    async delete(req, res) {
        User.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "Usuário apagado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 140,
                message: "Error: Usuário não foi apagado com sucesso!"
            });
        });
    }
}

//module.exports = new UserController();
export default new UserController();