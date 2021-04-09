//const User = require("../models/User");
import * as Yup from 'yup';
import User from "../models/User.js";

class UserController {
    // GET /users > Listar usuários
    // errors code: 100..109
    // ?page=1&limit=10
    async list(req, res) {
        // consultar no banco os usuários
        console.log(req.query);
        const limit = req.query.limit || 3;
        const page = req.query.page || 1;

        User.paginate({}, {select: '-senha', page, limit}).then((users) => {
            return res.json({
                error: false,
                users: users
            });
        }).catch(() => {
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
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            senha: Yup.string()
                .required()
                .min(6)
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 120,
                message: err.message
            });
        }

        const emailExiste = await User.findOne({ email: req.body.email });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Error: Este e-mail já está cadastrado!"
            });
        };
        
        User.create(req.body).then((user) => {
            return res.json(user);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Usuário não foi cadastrado com sucesso"
            });
        });
    }
    // PUT /users/:id
    // errors code: 130..139
    async update(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .notOneOf(['']),
            email: Yup.string()
                .email()
                .notOneOf(['']),
            senha: Yup.string()
                .min(6)
                .notOneOf([''])
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 130,
                message: err.message
            });
        }
        
        const usuarioExiste = await User.findOne({_id: req.params.id});

        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 131,
                message: "Erro: Usuário não encontrado!"
            });
        };
        
        if(req.body.email !== usuarioExiste.email){
            const emailExiste = await User.findOne({email: req.body.email});
            if(emailExiste){
                return res.status(400).json({
                    error: true,
                    code: 132,
                    message: "Erro: Este e-mail já está cadastrado!"
                });
            };
        };

        User.updateOne({_id: req.params.id}, req.body).then(() => {
            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 133,
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