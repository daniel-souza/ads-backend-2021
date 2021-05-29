import mongoose from 'mongoose';

const Person = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Campo 'name' é obrigatório"]
    },
    sex: {
        type: String,
        required: [true, "Campo 'sex' é obrigatório"],
        enum: ['M', 'F'],
        uppercase: true
    }
}, {
    timestamps: true
});

const Pet = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O campo 'name' é obrigatório"]
    },
    type: {
        type: String,
        required: [true, "O campo 'type' é obrigatório"],
    },
    owners: [Person]
}, {
    timestamps: true
});

export default mongoose.model("pet", Pet);