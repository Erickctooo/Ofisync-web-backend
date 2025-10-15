const pool = require("./models/db.js");
const express = require("express");
const cors = require("cors");

const oficinaRoutes = require("./routes/oficinaRoutes");
const pisoRoutes = require("./routes/pisoRoutes")
const personaRoutes = require("./routes/personaRoutes");
const edificioRoutes = require("./routes/edificioRoutes.js")
const gastoComunRoutes = require("./routes/gastoComunRoutes");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Conectamos las rutas
app.use("/api/oficinas", oficinaRoutes);
app.use("/api/pisos", pisoRoutes);
app.use("/api/personas", personaRoutes);
app.use("/api/edificios", edificioRoutes)
app.use("/api/gasto-comun", gastoComunRoutes);

// Manejadores de errores
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

// Exportamos la app para las pruebas y el servidor
module.exports = app;