import bcrypt from 'bcrypt';
import UserModel from "../models/UserModel.js";

class ProfileController {
    static async list(req, res) {
        UserModel.findById(req.userID)
            .then(user => res.json({ user }))
            .catch(() => res.status(404).json({error: true, message: "Usuário não encontrado!"}))
    }

    static async update(req, res) {
        try { 
            //verficar se o email a ser atualizado já está ou não cadastrado
            if (req.body.email) {
                const emailExiste = await UserModel.findOne({ email: req.body.email });
                if (!emailExiste)
                    return res.status(400).json({error: true, message: "Email já cadastrado!"})
            }
    
            if (req.body.senha) // tamanho mínimo será ignorado pela validação, já que o hash dará outro comprimento para 'senha'
                req.body.senha = bcrypt.hashSync(req.body.senha, 8); // solução usar hooks
    
            await UserModel.updateOne({ _id: req.userID }, req.body, { runValidators: true });
            return res.json({ error: false, message: "Usuário atualizado com sucesso!" });
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
        };
    }

    static async delete(req, res) {
        UserModel.deleteOne({ _id: req.userID })
            .then(() => res.json({ error: false, message: 'Usuário deletado com sucesso!' }))
            .catch(() => res.status(404).json({
                error: true,
                message: "Usuário não encontrado!"
            }))
    }

    static async listProducts(req, res) {
        UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'})
            .then(user => res.json({ produtos: user.produtos }))
            .catch(() => res.status(404).json({
                error: true,
                message: "Usuário não encontrado!"
            }))
    }

    static async listOneProduct(req, res) {
        try {
            const user = await UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});

            return res.json({ produtos: user.produtos.id(req.params.product_id) })
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    static async addProduct(req, res) {
        try {
            const user = await UserModel.findById(req.userID)
            if (!user)
                return res.status(404).json({error: true,message: "Usuário não encontrado!"});

            user.produtos.push(req.body);
            await user.save();

            return res.status(400).json({error: false, message: "Produto adicionado com sucesso!"});
        } catch (err) {
            //console.log(err)
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

    static async updateProduct(req, res) {
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
            //console.log(err)
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

    static async deleteProduct(req, res) {
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
            //console.log(err)
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

    static async listProductComments(req, res) {
        try {
            const user = await UserModel.findById(req.userID).populate({path: "produtos.comentarios.usuario", select: 'nome'});
            if (!user)
                return res.status(404).json({error: true, message: "Usuário não encontrado!"});
            if (!user.produtos.id(req.params.product_id))
                return res.status(404).json({error: true, message: "Produto não encontrado!"});

            return res.json({comentarios: user.produtos.id(req.params.product_id).comentarios})
        } catch (err) {
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    static async listOneProductComment(req, res) {
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
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

    static async addProductComment(req, res) {
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

    static async updateProductComment(req, res) {
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

    static async deleteProductComment(req, res) {
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
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        }
    }

}

export default ProfileController;