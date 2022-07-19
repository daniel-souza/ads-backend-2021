import jwt from 'jsonwebtoken'
import authConfig from '../configs/authConfig.js'



export default function authorize(arrrayOfAuthUsers = undefined) {
    return  (req, res, next) => {
        //console.log(arrrayOfAuthUsers)
        // verificar se o token foi informado no cabeçalho da requisição
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado!"
            })
        }
        const [, token] = req.headers.authorization.split(' ') // => [Bearer, {TOKEN}]

        try {
           const payload = jwt.verify(token, authConfig.API_SECRET);
           req.userID = payload.id;
           req.userRole = payload.role;
           // se não foi especificado nenhum papel como obrigatório, o usuário é autorizado
           if(!arrrayOfAuthUsers) {
               return next();
           }

           // caso contrário - verifica se o usuário possui um papel autorizado para a rota
           if(arrrayOfAuthUsers.indexOf(payload.role) === -1) {
                return res.status(401).json({
                    error: true,
                    message: 'Usuário não autorizado!'
                })
           }
           return next();
        } catch(exception) {
            //console.log(exception.name)
            if(exception.name === 'TokenExpiredError') {
                return res.status(401).json({
                    error: true,
                    message: "Tempo de acesso expirado!"
                });
            }

            return res.status(401).json({
                error: true,
                message: 'Token inválido!'
            })
        }

    }
}