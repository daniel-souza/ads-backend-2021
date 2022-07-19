//const express = require("express");
//const routes = require("./routes");
import express from "express";
import routes from "./routes.js";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

//reqire("./database/mongodb.js");
import "./database/Connection.js";

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(mongoSanitize()); // previne injeção
        this.app.use(cors({
            origin: "*",
            methods: ['GET','POST', 'PUT', 'DELETE']
        }));

    }
    routes() {
        this.app.use(routes);
    }
}

//module.exports = new App().app;
export default new App().app;