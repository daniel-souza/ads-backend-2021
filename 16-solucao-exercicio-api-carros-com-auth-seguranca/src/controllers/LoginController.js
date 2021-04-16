import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from "../models/User.js";
import authConfig from "../config/auth.js";

class LoginController {
    /*
    {
        "email": ''
        "senha": "(senha-normal)"
    }
    */
    async login(req, res) {
        /** implementar a autenticação do usuário aqui */
        const { email, senha } = req.body;

        // validar o email
        const userExiste = await User.findOne({ email: email });
        if(!userExiste) {
            return res.status(401).json({
                error: true,
                message: "Erro: Usuário não encontrado!"
            });
        }

        // validar a senha
        if( !( await bcrypt.compare( senha, userExiste.senha ) ) ) {
            return res.status(401).json({
                error: true,
                message: "Erro, senha inválida!"
            })
        }

        // autenticação
        return res.json({
            user: {
                _id: userExiste._id,
                nome: userExiste.nome,
                email: email
            },
            token: jwt.sign({id: userExiste._id}, authConfig.secret, { expiresIn: authConfig.expiresIn } )
        })
    }

}

export default new LoginController();