import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../models/User.js";

class LoginController {
    // POST /login
    /** { email, senha } */
    async login(req, res) {
        // verificar email
        const userExiste = await User.findOne({ email: req.body.email }).select("-createdAt -updatedAt");
        if(!userExiste) {
            return  res.status(401).json({
                error: true,
                message: "Erro: usuário não foi encontrado."
            })
        }

        // verificar a senha
        if( !(await bcrypt.compare(req.body.senha, userExiste.senha)) ) {
            return res.status(401).json({
                error: true,
                message: "Erro: senha incorreta."
            });
        }

        // autenticação do usuário com JWT
        userExiste.senha = undefined;
        return res.status(200).json({
            user: userExiste,
            token: jwt.sign({id: userExiste._id}, process.env.API_SECRET, {expiresIn: process.env.EXPIRES_IN})
        });

    }
}

export default new LoginController();