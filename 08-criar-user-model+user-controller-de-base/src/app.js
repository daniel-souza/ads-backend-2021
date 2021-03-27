//const express = require("express");
//const routes = require("./routes");
import express from "express";
import routes from "./routes.js";

//reqire("./database/mongodb.js");
import "./database/Connection.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
  }
  routes() {
    this.app.use(routes);
  }
}

//module.exports = new App().app;
export default new App().app;