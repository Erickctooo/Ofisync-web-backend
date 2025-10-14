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

// Conectamos las rutas de oficinas (todas comienzan con /api/oficinas)
app.use("/api/oficinas", oficinaRoutes);
app.use("/api/pisos", pisoRoutes);
app.use("/api/personas", personaRoutes);
app.use("/api/edificios", edificioRoutes)
app.use("/api/gasto-comun", gastoComunRoutes);


// 404 si ninguna ruta responde
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

// Error handler centralizado
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});



































//Agregar Gasto Comunes
app.post("/api/departamentos/agregar-gastos", async (req, res) => {
  try {
    const { total } = req.body;

    if (!total || isNaN(total)) {
      return res.status(400).json({ error: "El total es inválido" });
    }

    // 1️ Contar cantidad de departamentos
    const result = await pool.query("SELECT COUNT(*) FROM departamentos");
    const cantidadDepartamentos = parseInt(result.rows[0].count, 10);

    if (cantidadDepartamentos === 0) {
      return res.status(400).json({ error: "No hay departamentos registrados" });
    }

    // 2️ Calcular gasto por departamento
    const gastoPorDepto = total / cantidadDepartamentos;

    // 3️ Guardar en la columna gastosComunes para cada departamento
    await pool.query("UPDATE departamentos SET gastoscomunes = $1", [gastoPorDepto]);

    // 4️ Devolver la respuesta
    res.json({
      mensaje: " Gastos comunes guardados correctamente",
      totalGeneral: total,
      departamentos: cantidadDepartamentos,
      gastoPorDepto,
    });
  } catch (err) {
    console.error("Error al guardar en la base de datos:", err);
    res.status(500).json({ error: "Error al guardar en la base de datos" });
  }
});










