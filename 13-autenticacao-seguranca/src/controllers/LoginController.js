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
   /* code 150 .. 159 */
    async login(req, res) {
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
                authConfig.secret, {expiresIn: authConfig.expiresIn})
        });

    }

}

export default new LoginController();