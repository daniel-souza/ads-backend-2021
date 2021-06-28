import jwt from 'jsonwebtoken'

export default function authorize(arrrayOfAuthUsers = undefined) {
    return  (req, res, next) => {
        console.log(arrrayOfAuthUsers)
        // rerificar se o token foi informado no cabeçalho da requisição
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: true,
                message: "Token não encontrado!"
            })
        }
        const [, token] = req.headers.authorization.split(' ') // => [Bearer, {TOKEN}]

        try {
           const payload = jwt.verify(token, process.env.API_SECRET);
           req.userID = payload.id;
           console.log(req.userID)
           // se nosso usário não possui diferentes papéis
           if(!payload.role) {
               return next();
           }

           // caso contrário - nosso usuário possui diferentes papéis
           // verificar se o usário é autorizado
           if(arrrayOfAuthUsers.indexOf(payload.role) === -1) {
                return res.status(401).json({
                    error: true,
                    message: 'Usuário não autorizado!'
                })
           }
           next();
        } catch(exception) {
            console.log(exception.name)
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