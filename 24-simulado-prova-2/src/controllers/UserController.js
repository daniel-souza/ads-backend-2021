import User from "../models/User.js";
import bcrypt from 'bcrypt';

class UserController {
    // GET /users/:user_id
    async list(req,res) {
        User.findById({}).then((users) => { // sucesso
            res.json({
                error: false,
                users
            })
        }).catch((err) => { // erro
            res.status(400).json({
                error: true,
                message: "Erro ao executar a solicitação!"
            })
        });
    }
    // GET /users/:user_id
    async listOne(req,res) {
        User.findById(req.params.user_id).then((user) => { // sucesso
            res.json({
                error: false,
                user
            })
        }).catch((err) => { // erro
            res.status(400).json({
                error: true,
                message: "Erro, usuário não encontrado!"
            })
        });
    }

    // GET /users/:user_id/posts
    async listPosts(req, res) {
        try {
            const userExiste = await User.findById(req.params.user_id);
            if(!userExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            return res.json({ 
                error: false, 
                posts: userExiste.posts 
            });
        } catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }
    }

    // GET /users/:user_id/posts/:post_id
    async listOnePost(req, res) {
        try {
            const userExiste = await User.findById(req.params.user_id);
            if(!userExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            const postExiste = userExiste.posts.id(req.params.post_id);
            if(!postExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Post não encontrado!"
                });
            }
    
            res.json({
                error: false,
                post: postExiste
            });
        } catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            if(err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro a executar esta solicitação!"
                })
            }
        }
    }
}

export default new UserController();