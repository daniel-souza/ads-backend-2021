import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from "../models/User.js";
import authConfig from "../config/auth.js";

class LoginController {
    /*
    {
        "email": ''
        "senha": "(senha-normal)"
    }
    */
    async login(req, res) {
        /** implementar a autenticação do usuário aqui */
    }

}

export default new LoginController();