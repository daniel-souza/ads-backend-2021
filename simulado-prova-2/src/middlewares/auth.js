import jwt from 'jsonwebtoken';
//import {promisify} from "util";

export default async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            error: true,
            code: 160,
            message: "Erro: Token não encontrado!"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        //const decode = await promisify(jwt.verify)(token, process.env.API_SECRET);
        const decode = jwt.verify(token, process.env.API_SECRET);
        req.userID = decode.id;
        return next();
    } catch(err) {
        return res.status(401).json({
            error: true,
            code: 161,
            message: "Erro: Token inválido!"
        });
    }

}