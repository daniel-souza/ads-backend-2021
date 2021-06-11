import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../models/User.js";

class SignController {
    /*
    {
        "email": ''
        "senha": "(senha-normal)"
    }
    */
   /* code 150 .. 159 */
    async login(req, res) { // signin
        const { email, senha } = req.body;

        const userExiste = await User.findOne({email: email});

        if(!userExiste) {
            return res.status(401).json({
                error: true,
                code: 150,
                message: "Erro: Usuário não encontrado!"
            });
        }

        if( !(await bcrypt.compare(senha, userExiste.senha)) ) {
            return res.status(401).json({
                error: true,
                code: 151,
                message: "Erro: Senha inválida!"
            });
        }

        return res.json({
            user: {
                _id: userExiste._id,
                nome: userExiste.nome,
                email
            },
            token: jwt.sign({id: userExiste._id},
                process.env.API_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        });

    }

    async signup(req, res) {

        // garantir que o email é único
        const userExiste = await User.findOne({email: email});
        if(userExiste) {
            return res.status(400).json({
                error: true,
                message: "Erro: email já cadastrado!"
            });
        }

        // se senha foi fornecida
        if(req.body.senha) {
            req.body.senha = bcrypt.hashSync(req.body.senha, 7);
        }

        User.create(req.body).then(user => {
            user.senha = undefined; // para não exibir a senha ao voltar os dados do usuário criado
            return res.json({
                error: false,
                user
            })
        }).catch(err => {
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

}

export default new SignController();