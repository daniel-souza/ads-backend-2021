import User from "../models/User.js";
import bcrypt from 'bcrypt';

class ProfileController {
    // GET /profile
    async list(req,res) {
        User.findById(req.userID).then((user) => { // sucesso
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
    // PUT /profile
    async update(req,res) {
        // garantir que o email é único
        const userExiste = await User.findOne({email: email});
        if(userExiste) {
            return res.status(400).json({
                error: true,
                message: "Erro: email já cadastrado!"
            });
        }

        // se senha foi fornecida
        if(req.body.senha) {
            req.body.senha = bcrypt.hashSync(req.body.senha, 7);
        }

        User.updateOne({_id: req.userID}, req.body).then(() => { // sucesso
            return res.json({
                error: false,
                message: "Usuário atualizado com sucesso!"
            });
        }).catch((err) => { // erro
    
            if(err.name === "CastError") {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
    
            if(err.name === "ValidationError") {
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
            
        });

    }
    // DELETE /profile
    async delete(req,res) {
        User.deleteOne({_id: req.userID}).then(() => { // sucesso
            res.json({ // status 200 ok
                error: false,
                message: "Usuário deletado com sucesso!"
            });
        }).catch((err) => { // erro
            console.log(err)
            res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
        });
    }

    // GET /profile/posts
    async listPosts(req, res) {
        try {
            const userExiste = await User.findById(req.userID);
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

    // GET /profile/posts/:post_id
    async listOnePost(req, res) {
        try {
            const userExiste = await User.findById(req.userID);
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
    
    // POST /profile/posts
    async addPost(req, res) {
        try {
            const userExiste = await User.findById(req.userID);
            if(!userExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            const totalPosts = userExiste.posts.push(req.body);
            userExiste.save((err) => { //const err = userExiste.validateSync()
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: err.message,
                        ValidationError: err.errors
                    });
                }
            
                // Não havendo erro, então
                return res.json({ // status: 200 ok
                    error: false,
                    post: userExiste.posts[totalPosts-1]
                })
            });
        }  catch(err) {
            if(err.name === 'CastError') {
                return res.status(400).json({
                    error: true,
                    message: "Post não encontrado!"
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
    
    // PUT /profile/posts/:post_id
    async updatePost(req, res) {
        try {
            const userExiste = await User.findById(req.userID);
            if(!userExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            if(!userExiste.posts.id(req.params.post_id)) {
                return res.status(400).json({
                    error: true,
                    message: "Post não encontrado!"
                });
            }
            if(req.body.titulo) {
                userExiste.posts.id(req.params.post_id).titulo = req.body.titulo;
            }
            if(req.body.conteudo) {
                userExiste.posts.id(req.params.post_id).conteudo = req.body.conteudo;
            }
            userExiste.save((err) => { //const err = userExiste.validateSync()
                console.log(err);
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: err.message,
                        ValidationError: err.errors
                    });
                }
            
                // Não havendo erro, então
                return res.json({ // status: 200 ok
                    error: false,
                    post: userExiste.posts.id(req.params.post_id)
                })
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
    
    // DELETE /profile/posts/:post_id
    async deletePost(req, res) {
        try {
            const userExiste = await User.findById(req.userID);
            if(!userExiste) {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
            
            if(!userExiste.posts.id(req.params.post_id)) {
                return res.status(400).json({
                    error: true,
                    message: "post não encontrado!"
                });
            }
    
            userExiste.posts.id(req.params.post_id).remove();
            userExiste.save( (err) => {
                if(err) {
                    return res.status(400).json({
                        error: true,
                        message: "Erro a executar esta solicitação!"
                    });
                }
    
                return res.json({
                    error: false,
                    message: "Post deletado com sucesso!"
                })
    
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

export default new ProfileController();