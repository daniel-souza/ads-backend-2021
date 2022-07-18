import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../configs/authConfig.js';

import UserModel from "../models/UserModel.js";

class SignController {

    // cadastrar usuário
    static async signUp(req, res) {
        try {
            const userExiste = await UserModel.findOne({ email: req.body.email });
            //verficar se email já está cadastrado
            if (userExiste) 
                return res.status(400).json({error: true, message: "Email já cadastrado!"});

            // criptografar senha
            if (req.body.senha)
                req.body.senha = bcrypt.hashSync(req.body.senha, 8);

            const user = await UserModel.create(req.body);
            user.senha = undefined;
            return res.status(201).json({ user });
        } catch(err) {
            if (err.name === "ValidationError") {
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
        }
    }

    // login do usuário {email e senha}
    static async signIn(req, res) {
        try {
            //verficar se email está ou não cadastrado
            const userExiste = await UserModel.findOne({ email: req.body.email }).select("+senha");
            if (!userExiste)
                return res.status(400).json({error: true, message: "Usuário ou senha incorretos!"})
    
            // verificar se a senha informada corresponde com a do usuário cadastrado
            if(!req.body.senha)
                return res.status(400).json({error: true, message: "Senha não informada!"})
    
            if(!bcrypt.compareSync(req.body.senha, userExiste.senha))
                return res.status(400).json({error: true, message: "Usuário ou senha incorretos!"})
            
            // autenticação do usuário com token de acesso
            return res.json({
                error: false,
                usuario: {
                    id: userExiste._id,
                    nome: userExiste.nome
                },
                token: jwt.sign(
                    { id: userExiste._id }, // payload
                    authConfig.API_SECRET, // secret
                    { expiresIn: authConfig.JWT_EXPIRES_IN }  // options
                )
    
            })
        } catch(err) {
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }

    }
}

export default SignController;