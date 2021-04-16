import Carro from "../models/Carro.js"

class CarroController {
    //GET /carros, para listar todos os carros
    async list(req, res) {
        Carro.find({}).then((carros) => {
            res.json({
                error: false,
                carros: carros
            });
        }).catch((err => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro ao listar os carros!"
            })
        }));
    }
    //GET /carros/:id para listar apenas um carro
    async listOne(req, res) {
        Carro.findOne({ _id: req.params.id }).then((carro) => {
            return res.json({
                error: false,
                Carro: carro
            });
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "Erro ao listar o carro!"
            })
        })
    }
    //POST /carros para criar um novo carro
    /*
    {
        modelo:
        fabricante:
        ...
    }
    */
    async create(req, res) {
        Carro.create(req.body).then((carro) => {
            return res.json({
                error: false,
                message: "Carro criado com sucesso!",
                carro: carro
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Error: carro não foi cadastrado com sucesso!"
            })
        })
    }
    //PUT /carros/:id para editar um carro existente
    async update(req, res) {
        Carro.updateOne({ _id: req.params.id }, req.body).then(() => {
            return res.json({
                error: false,
                message: "Carro foi editado com sucesso!"
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Erro: carro não foi editado com sucesso!"
            })
        })
    }
    //DELETE /carros/:id para deletar um carro
    async delete(req, res) {
        Carro.deleteOne({ _id: req.params.id }).then(() => {
            return res.json({
                error: false,
                message: "Carro apagado com sucesso!"
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                error: true,
                message: "Error: não foi possível executar a solicitação de deleção!"
            })
        });
    }

}

export default new CarroController();