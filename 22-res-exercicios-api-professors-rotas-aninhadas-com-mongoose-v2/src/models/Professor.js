import mongoose from "mongoose";

const Class = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome é um campo obrigatório!"]
    },
    description: String
}, {
    timestamps: true,
});

const Professor = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome é um campo obrigatório!"]
    },
    sex: {
        type: String,
        required: [true, "Sex é um campo obrigatório!"]
    },
    classes: [Class]
}, {
    timestamps: true
});

export default mongoose.model("professor",Professor);