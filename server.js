const express = require("express");
const db = require("./db");

const PUERTO = process.env.PUERTO || 3000;
const app = express();

app.use(express.json());
app.use(express.static('public')); 
//CREACION DE RUTAS
//CREAR PRODUCTO

app.post("/products", (req, res) => {
  const query = "INSERT INTO products (nombre , descripcion) VALUES (? , ?)";
  const { nombre, descripcion } = req.body;

  db.query(query, [nombre, descripcion], (err, results) => {
    if (err) throw err;
    res.status(201).json(results);
  });
});

//LEER DATOS
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.status(201).json(results);
  });
});

//ACTUALIZAR DATOS

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion } = req.body;

  const query =
    "UPDATE products SET nombre = ? , descripcion  = ? where id = ? ";

  db.query(query, [nombre, descripcion, id], (err, results) => {
    if (err) throw err;
    res.status(201).send("Registro Actualizado");
  });
});

//EIMINAR PRODUCTO
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE  FROM products WHERE  id = ?";

  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.status(201).send("Registro Eliminado");
  });
});
app.listen(PUERTO, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PUERTO}`);
});
