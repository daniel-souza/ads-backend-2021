import jwt from 'jsonwebtoken';
import {promisify} from "util";
import authConfig from "../config/auth.js";

export default async(req, res, next) => {
    /**
     * Implementar o middleware auth.js aqui
     */
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Erro: token não encontrado!"
        })
    }

    //Bearer <Token>
    const [, token] = authHeader.split(" ");
    try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret);
        req.userID = decode.id;
        return next();
    } catch(err) {
        return res.status(401).json({
            error: true,
            message: "Erro: token inválido!"
        });
    }
}