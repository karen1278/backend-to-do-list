//importa la libreria mongoose 
const mongoose = require("mongoose");
//crea un esquema de datos llamado "todoSchema" el esquema define las propiedades "title" de tipo string y "completed" de tipo boolean 
const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});
//exporta un modelo llamado todo que se utiliza para interactuar con la base de datos mongodb crear, leer, actualizar y eliminar documentos 
module.exports = mongoose.model("Todo", TodoSchema);
