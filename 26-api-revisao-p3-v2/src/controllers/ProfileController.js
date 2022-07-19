import UserModel, { GenaralUserModel } from "../models/UserModel.js";

class ProfileController {
    static async list(req, res, next) {
        GenaralUserModel.findById(req.userID).select("-role") // omite o papel (role) da seleção
            .then(user => res.json({ user }))
            .catch(() => res.status(404).json({error: true, message: "Usuário não encontrado!"}))
    }

    static async update(req, res, next) {
        try { 
            //verficar se o email a ser atualizado já está ou não cadastrado
            if (req.body.email) {
                const emailExiste = await GenaralUserModel.findOne({ email: req.body.email }).select("-role");
                if (!emailExiste)
                    return res.status(400).json({error: true, message: "Email já cadastrado!"})
            }
            // validação da senha ocorrerá na etapa de update, mas antes de salvar será criptografada
            await GenaralUserModel.updateOne({ _id: req.userID }, req.body, { runValidators: true });
            return res.json({ error: false, message: "Usuário atualizado com sucesso!" });
        } catch(err) {
                next(err);
        };
    }

    static async delete(req, res, next) {
        UserModel.deleteOne({ _id: req.userID })
            .then(() => res.json({ error: false, message: 'Usuário deletado com sucesso!' }))
            .catch(() => res.status(404).json({
                error: true,
                message: "Usuário não encontrado!"
            }))
    }

    static async listProducts(req, res, next) {
        UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'})
            .then(user => res.json({ produtos: user.produtos }))
            .catch(() => res.status(404).json({
                error: true,
                message: "Usuário não encontrado!"
            }))
    }

    static async listOneProduct(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos || !user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            console.log(user.produtos.id(req.params.product_id));
            return res.json({ produto: user.produtos.id(req.params.product_id) })
        } catch (err) {
            return next(err);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID)
            if (!user)
                return res.status(404).json({error: true,message: "Usuário não encontrado!"});

            user.produtos.push(req.body);
            await user.save();

            return res.status(400).json({error: false, message: "Produto adicionado com sucesso!"});
        } catch (err) {
            return next(err);
        }

    }

    static async updateProduct(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID)
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});

            user.produtos.id(req.params.product_id).set(req.body);
            await user.save();

            return res.status(400).json({error: false, message: "Produto editado com sucesso!"});
        } catch (err) {
            return next(err);
        }

    }

    static async deleteProduct(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID);
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            
            user.produtos.id(req.params.product_id).remove();
            await user.save();
            
            return res.status(400).json({error: false, message: "Produto deletado com sucesso!"});
        } catch (err) {
            return next(err);
        }

    }

    static async listProductComments(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});

            return res.json({comentarios: user.produtos.id(req.params.product_id).comentarios})
        } catch (err) {
            return next(err);
        }
    }

    static async listOneProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if (!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});

            return res.json({comentario: user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id)});
        } catch (err) {
            return next(err);
        }
    }

    static async addProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID);
             if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            
            req.body.usuario = req.userID;
            user.produtos.id(req.params.product_id).comentarios.push(req.body);
            await user.save();

            return res.json({error: false, message: "Comentário adicionado com sucesso!"});
        } catch (err) {
            return next(err);
        }
    }

    static async updateProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID);
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if (!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});
            
            req.body.data_hora = Date.now();
            user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).set(req.body);
            await user.save();

            return res.json({error: false, message: "Comentário editado com sucesso!"});
        } catch (err) {
            return next(err);
        }
    }

    static async deleteProductComment(req, res, next) {
        try {
            const user = await UserModel.findById(req.userID);
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});
            if (!user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id))
                return res.status(404).json({error: true, message: "Comentário não encontrado!"});

            user.produtos.id(req.params.product_id).comentarios.id(req.params.comment_id).remove();
            await user.save();

            return res.json({error: false, message: "Comentário deletado com sucesso!"});
        } catch (err) {
            return next(err);
        }
    }

}

export default ProfileController;