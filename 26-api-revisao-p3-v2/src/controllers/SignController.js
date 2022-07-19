import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../configs/authConfig.js';

import UserModel, { GenaralUserModel } from "../models/UserModel.js";

class SignController {

    // cadastrar usuário
    static async signUp(req, res, next) {
        try {
            const userExiste = await UserModel.findOne({ email: req.body.email });
            //verficar se email já está cadastrado
            if (userExiste) 
                return res.status(400).json({error: true, message: "Email já cadastrado!"});

            // criptografia da senha é realizada através de hooks
            const user = await UserModel.create(req.body);
            user.senha = undefined;
            return res.status(201).json({ user });
        } catch(err) {
            return next(err);
        }
    }

    // login do usuário {email e senha}
    static async signIn(req, res, next) {
        try {
            //verficar se email está ou não cadastrado (tanto usuários comuns quanto admins)
            const userExiste = await GenaralUserModel.findOne({ email: req.body.email }).select("+senha");
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
                    { id: userExiste._id, role: userExiste.role }, // payload
                    authConfig.API_SECRET, // secret
                    { expiresIn: authConfig.JWT_EXPIRES_IN }  // options
                )
    
            })
        } catch(err) {
            return next(err);
        }

    }
}

export default SignController;