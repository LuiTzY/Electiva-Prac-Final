const express = require("express");
const app = express();
const db = require("./db");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors()); // Habilita CORS
app.use(express.json());

// Obtener todas las tareas
app.get("/tareas", (req, res) => {
  db.query("SELECT * FROM tareas", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear una tarea
app.post("/tareas", (req, res) => {
  const { asignado, titulo, descripcion, estado } = req.body;
  const sql =
    "INSERT INTO tareas (asignado, titulo, descripcion, estado) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [asignado, titulo, descripcion, estado || "pendiente"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, mensaje: "Tarea creada" });
    }
  );
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
