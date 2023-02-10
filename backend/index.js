//se importa el paquete express que proporciona funcionalidad para crear aplicaciones web en node
const express = require("express");
//importa la libreria mongoose  //moongose es odm para mongodb, permite interactuar con una base de datos 
const mongoose = require("mongoose");
// const cors = require("cors");


//definimos la constante PORT con el numero de puerto que la aplicación utilizara para escuchar solicitudes, en este caso 3030
const PORT = 3030;
//se crea una instancia de la aplicacion de express //el resultado de esta llamada se le asigna a la constante app //con esta constante podemos acceder a todos los metodos y funciones proporcionados por express
const app = express();

//se importa el modulo "todoRoutes" desde el archivo "./routes/todoRoutes"
const todoRoutes = require("./routes/todoRoutes");

const connectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useFindAndModify: false
};

//Express.json() es un middleware que analiza el cuerpo de la solicitud y convierte la entrada JSON en un objeto JavaScript accesible en req.body. Por lo tanto, esta línea de código permite a la aplicación Express recibir y procesar datos en formato JSON.
app.use(express.json());
// app.use(cors());

//establece una conexion con una base de datos mongodb// en este caso se refiere a una base de datos "todolist" alojada en el localhost //la conexion se realiza mediante una promesa devuelta por la funcion connect se compone de dos callback
mongoose.set('strictQuery', true)//suprime advertencia de strictquery
mongoose.connect("mongodb+srv://jonathanromero:Emibra888%40@cluster0.xreyfta.mongodb.net/todolist")
    //el callback then es invocado si la conexion es exitosa y se muestra un mensaje en la consola indicando que la conexion se realizo con exito    
    .then(() => console.log("connected successfully"))
    // el callback catch es invocado si la funcion falla y muestra un mensaje de error 
    .catch((err) => console.error(err));

//usa el modulo "todoRoutes" como middleware en la aplicación //se establece un prefijo de la ruta para todas las rutas dentro de el en este caso "/todos"
app.use("/todos", todoRoutes);
//se inicia el servidor de la aplicación y se especifica el puerto que utilizara para escuchar solicitudes
app.listen(PORT, () => {
    //escribira un mensaje en consola que indica que el servidor esta escuchando en el puerto especificado
    console.log("The server is listening on port " + PORT);
});