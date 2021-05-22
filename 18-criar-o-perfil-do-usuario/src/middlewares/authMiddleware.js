import { promisify } from "util";
import jwt from 'jsonwebtoken';

// req.headers.authorization
export default async function authMiddleware(req, res, next) {
    // verificar se o token foi fornecido pelo usuário.
    if(!req.headers.authorization) {
        return res.status(401).json({
            error: true,
            massage: "Erro: token não encontrado!"
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    // 2. Verificar validade do token
    try {
        const decode = await promisify(jwt.verify)(token, process.env.API_SECRET);
        req.userID = decode.id;
    } catch(err) {
        return res.status(401).json({
            error: true,
            message: "Erro: Token inválido!"
        });
    }

    // passando a validação
    return next();
}