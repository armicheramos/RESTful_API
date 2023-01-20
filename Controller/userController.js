//Importar express
const express = require("express");
//Metodo para gestionar las rutas
const router = express.Router();
//Importamos modelo con schema correspondiente
const Model = require("../Model/userModel");

//Escuchar peticiones GET
router.get("/", async (req, res) => {
  // Model.find()
  //   .then((data) =>
  //     res.status(200).json({ status: "succeeded", data, error: null })
  //   )
  //   .catch((error) =>
  //     res.status(404).json({
  //       status: "failed",
  //       data: null,
  //       error: error.message,
  //     })
  //   );
  try {
    const data = await Model.find();
    res.status(200).json({ status: "succeeded", data, error: null });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
});

//Endpoint 2 (Obtener documento por ID)
router.get("/:id", (req, res) => {
  Model.findById(req.params.id)
    .exec()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

//Médodo: Recibir documentos POST
router.post("/", (req, res) => {
  const data = new Model({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    skills: req.body.skills,
    personality: req.body.personality,
  });

  data
    .save()
    .then((data) =>
      res.status(201).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});
//Metrodo (Actualizar documento por ID)
router.patch("/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  const options = {
    new: true,
  };
  Model.findByIdAndUpdate(id, data, options)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});
//Metrodo (Borrar documento por ID)
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Model.findByIdAndDelete(id)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

module.exports = router;
