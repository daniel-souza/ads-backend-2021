import UserModel from "../models/UserModel.js";

class UserController {
    // rotas públicas
    static async list(req, res, next) {
        UserModel.find({}).select("-role") // .select("-senha") não precisa mais, já que no schema senha está com select: false
            .then(users => res.json({error: false, users}))
            .catch(() => res.status(404).json({error: true, message: "Not found"}))
    }

    static async listOne(req, res, next) {
        UserModel.findById(req.params.user_id).select("-role")
            .then(user => res.json({error: false, user}))
            .catch(() => res.status(404).json({error: true, message: "Usuário não encontrado!"}))
    }

    static async listProducts(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id)
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            
            return res.json({error: false, produtos: user.produtos})
        } catch(err) {
            return next(err);
        }
    }

    static async listOneProduct(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id)
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"})

            return res.json({error: false, produto: user.produtos.id(req.params.product_id)})
        } catch(err) {
            return next(err);
        }
    }

    static async listProductComments(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"})

            return res.json({error: false, comentarios: user.produtos.id(req.params.product_id).comentarios})
        } catch(err) {
            return next(err);
        }
    }

    static async listOneProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"})
            if(!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"})

            return res.json({error: false, comentario: user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id)})
        } catch(err) {
            return next(err);
        }
    }

    // ROTAS PRIVADAS -- Usuário autenticado só poderá adcionar, deletar e editar comentários exclusivamente seus.
    static async addProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id);
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"})
            
            req.body.usuario = req.userID;
            user.produtos.id(req.params.product_id).comentarios.push(req.body)
            await user.save()

            return res.json({error: false, message: "Comentário adicionado com sucesso!"});
        } catch(err) {
            return next(err);
        }     
    }

    static async updateProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id);
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if(!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});
            
            if(user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).usuario != req.userID && req.role == "User")
                return res.status(403).json({error: true, message: "Usuário não autorizado a exectuar esta solicitação!"});
            
            req.body.data_hora = Date.now();
            user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).set(req.body);
            await user.save()

            return res.json({error: false, message: "Comentário atualizado com sucesso!"});
        } catch(err) {
            return next(err);
        }     
    }

    static async deleteProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.user_id);
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if(!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});
            if(user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).usuario != req.userID && req.role == "User")
                return res.status(403).json({error: true, message: "Usuário não autorizado a exectuar esta solicitação!"});
            
            user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).remove();
            await user.save()

            return res.json({error: false, message: "Comentário deletado com sucesso!"});
        } catch(err) {
            return next(err);
        }     
    }

}

export default UserController;