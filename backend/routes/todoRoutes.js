//importa el metodo "router" desde el paquete express y se crea una instancia de el
const router = require("express").Router();
//importa el modelo de datos "Todo"
const Todo = require("../models/Todo");


//establece una ruta get para la raiz "/" y se proporciona un controlador de solicitudes para ella //el controlador de solicitudes toma dos argumentos "req"y "res" que presentan la solicitud y la respuesta
router.get("/", (req, res) => {
    //se esta llamando al metodo find del modelo Todo, se utiliza para recuperar todos los documentos de la coleccion "todo" //la funcion de devolucion de llamada recibira dos argumentps "err" y "result"

    Todo.find((err, result) => {
        //si existe un error al recuperar los documentos de la coleccion, se crea una nueva excepcion con el mensaje de error
        if (err) throw new Error(err);
        //se imprime el resultado en la consola
        res.json(result);
        console.log(result);
        
    });
});


//Estamos definiendo una nueva ruta POST para nuestra app, cualquier solicitud post en la ruta /new activara la funcion de llamada 
router.post("/", (req, res) => {
    //creamos un nuevo documento todo utilizando el metodo create, pasamos como argumento el cuerpo de la solicitud que debe contener los datos para el nuevo documento
    Todo.create(req.body, (err, result) => {
        //si hay un error al guardar el documento se lanza un mensaje de error
        if (err) throw new Error(err);
        //estamos imprimiendo el resultado de la operación de creación eb consola
        res.json(result);
    });
});


//actualizar documento de la base de datos
router.put("/:id", (req, res) => {
    //findOneAndUpdate se utiliza para buscar y actualizar un doc. especifico
    Todo.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, result) => {
        if (err) throw new Error(err);
        res.json(result);
    });
});

//creamos un nuevo endpoint en el router de express, el endpoint es /:id este acepta solicitudes http delete, el endpoint acepta dos parametros req que contiene info sobre la solicitud http y res que envia una respuesta a la solicitud
router.delete("/:id", (req, res) => {
    //se una fondoneremove del modelo todo para buscar un documento en la base de datos y eliminarlo, la busqueda se realiza con el criterio id_req.body.id esto significa que se busca un documento que tenga un id igual al valor en el cuerpo de la solicitud res.body.id
    Todo.findOneAndRemove({ _id: req.params.id }, (err, result) => {
        //se verifica si existe un objeto de error
        if (err) throw new Error(err);
        //imprime el resultado de la operación(el documento eliminado)
        res.end();
    });
});

//se exporta el objeto "router" como un modulo que puede ser importado en otro archivo
module.exports = router;