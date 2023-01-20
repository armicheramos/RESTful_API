// Importar los modulos express y mongoose.
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// Obtener la informacion del archivo env.
require("dotenv").config();
// Almacenar la cadena de informacion.
const mongoString = process.env.DATABASE_URL;

// Conectar con la base de datos.
mongoose.connect(mongoString, { useNewUrlParser: true });
// Guardar la conexion.
const db = mongoose.connection;
//Verificar si la conexion ha sido exitosa.
db.on("error", (error) => {
  console.log(error);
});
// Se ejecuta una unica vez, por eso en lugar de on, cuando se conecta a la base de datos.
db.once("connected", () => {
  console.log("succesfully connected");
});
// Recibir una notificacion cuando la conexion se haya cerrado.
db.on("disconnected", () => {
  console.log("mongoose default connection is disconected");
});
// Importacion de controladores.
const users = require("./Controller/userController");
const PORT = 8000;
// Crear la app express.
const app = express();
// Analizar los archivos JSON.
app.use(express.json());

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`server running at http://127.0.0.1:${PORT}`);
});
