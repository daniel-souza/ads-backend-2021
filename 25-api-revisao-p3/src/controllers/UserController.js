import UserModel from "../models/UserModel.js";

class UserController {
    // rotas públicas
    async list(req, res) {
        UserModel.find({}).select("-senha")
            .then(users => res.json({error: false, users}))
            .catch(() => res.status(404).json({error: true, message: "Not found"}))
    }

    async listOne(req, res) {
        UserModel.findById(req.params.user_id).select("-senha")
            .then(user => res.json({error: false, user}))
            .catch(() => res.status(404).json({error: true, message: "Usuário não encontrado!"}))
    }

    async listProducts(req, res) {
        try {
            const user = await UserModel.findById(req.params.user_id)
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            
            return res.json({error: false, produtos: user.produtos})
        } catch(err) {
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    async listOneProduct(req, res) {
        try {
            const user = await UserModel.findById(req.params.user_id)
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"})

            return res.json({error: false, produto: user.produtos.id(req.params.product_id)})
        } catch(err) {
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    async listProductComments(req, res) {
        try {
            const user = await UserModel.findById(req.params.user_id).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"})
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"})

            return res.json({error: false, comentarios: user.produtos.id(req.params.product_id).comentarios})
        } catch(err) {
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    async listOneProductComment(req, res) {
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
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    // ROTAS PRIVADAS -- Usuário autenticado só poderá adcionar, deletar e editar comentários exclusivamente seus.
    async addProductComment(req, res) {
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
            if (err.name === "ValidationError") {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }

            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }     
    }

    async updateProductComment(req, res) {
        try {
            const user = await UserModel.findById(req.params.user_id);
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if(!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});
            if(user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).usuario != req.userID)
                return res.status(403).json({error: true, message: "Usuário não autorizado a exectuar esta solicitação!"});
            
            req.body.data_hora = Date.now();
            user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).set(req.body);
            await user.save()

            return res.json({error: false, message: "Comentário atualizado com sucesso!"});
        } catch(err) {
            if (err.name === "ValidationError") {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }

            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }     
    }

    async deleteProductComment(req, res) {
        try {
            const user = await UserModel.findById(req.params.user_id);
            if(!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if(!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if(!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});
            if(user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).usuario != req.userID)
                return res.status(403).json({error: true, message: "Usuário não autorizado a exectuar esta solicitação!"});
            
            user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).remove();
            await user.save()

            return res.json({error: false, message: "Comentário deletado com sucesso!"});
        } catch(err) {
            
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }     
    }

}

export default new UserController();