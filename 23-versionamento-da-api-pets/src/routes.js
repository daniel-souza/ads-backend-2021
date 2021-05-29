//const { Router } = require("express");
import { Router } from "express";

import Pet from "./models/PetV2.js";
import PetControllerV2 from "./controllers/PetControllerV2.js";
import PetControllerV1 from "./controllers/PetControllerV1.js";
import app from "./app.js";

const routes = new Router();
const routesV1 = new Router();
const routesV2 = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// INICIO Rotas de Pets V1 -----------------------------
// GET /pets - Listar todos os pets.
routesV1.get("/pets", PetControllerV1.list);
// GET /pets/:pid - Listar um pet.
routesV1.get("/pets/:pid", PetControllerV1.listOne);
// POST /pets - Criar novo Pet.
routesV1.post("/pets", PetControllerV1.create);
// PUT /pets/:pid - Editar um Pet.
routesV1.put("/pets/:pid", PetControllerV1.update);
// Delete /pets/:pid - Deletar um Pet.
routesV1.delete("/pets/:pid", PetControllerV1.delete);

// GET /pets/:pid/owners - Listar todos os proprietários de um Pet.
routesV1.get("/pets/:pid/owners", PetControllerV1.listOnwers);
// GET /pets/:pid/owners/:oid - Listar um proprietário de um Pet.
routesV1.get("/pets/:pid/owners/:oid", PetControllerV1.listOneOwner);
// POST /pets/:pid/owners - Criar novo Proprietário de um pet.
routesV1.post("/pets/:pid/owners", PetControllerV1.addOnwer);
// PUT /pets/:pid/owners/:oid - Editar um proprietário de um pet.
routesV1.put("/pets/:pid/owners/:oid", PetControllerV1.updateOwner);
// Delete /pets/:pid/owners/:oid - Deletar um proprietário de um Pet.
routesV1.delete("/pets/:pid/owners/:oid", PetControllerV1.deleteOwner);
// FIM Rotas de Pets V1 --------------------------------

// INICIO Rotas de Pets V2 -----------------------------
// GET /pets - Listar todos os pets
routesV2.get("/pets", PetControllerV2.list);
// GET /pets/:pid - Listar um pet
routesV2.get("/pets/:pid", PetControllerV2.listOne);
// POST /pets
routesV2.post("/pets", PetControllerV2.create);
// PUT /pets/:pid
routesV2.put("/pets/:pid", PetControllerV2.update);
// DELETE /pets/:pid
routesV2.delete("/pets/:pid", PetControllerV2.delete);

// Proprietários de um Pet - Rotas aninhadas
// GET /pets/:pid/owners - Listar todos os proprietários de um pet
routesV2.get("/pets/:pid/owners", PetControllerV2.listOnwers);
// GET /pets/:pid/owners/:oid - Listar um proprietário de um pet
routesV2.get("/pets/:pid/owners/:oid", PetControllerV2.listOneOwner);
// POST /pets/:pid/owners - Cadastrar novo proprietário de um Pet.
routesV2.post("/pets/:pid/owners", PetControllerV2.addOnwer);
// PUT /pets/:pid/owners/:oid - Editar um proprietário de um Pet
routesV2.put("/pets/:pid/owners/:oid", PetControllerV2.updateOwner);
// DELETE /pets/:pid/owners/:oid - Deletar um proprietário de um Pet
routesV2.delete("/pets/:pid/owners/:oid", PetControllerV2.deleteOwner);
// FIM Rotas de Pets V2 --------------------------------

routes.use("/v1", routesV1);
routes.use("/v2", routesV2);
routes.use("/", routesV2);

// 404 - Page/Resource Not Found
routes.use((req, res, next) => {
    return res.status(404).json({
        error: true,
        message: `Resource '${req.url}' Not Found!`
    });
});

// 500 - Internal Server Error
routes.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        errror: true,
        message: "Internal Server Error"
    });
});

process.on('uncaughtException', function(err) {
    // Handle the error safely
    console.log(err)
});

//module.exports = routes;
export default routes;