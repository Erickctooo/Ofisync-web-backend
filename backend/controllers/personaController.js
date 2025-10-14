const pool = require("../models/db.js"); // conexión a BD

// Obtener todas las personas
const obtenerPersonas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nombre
      FROM persona
      ORDER BY nombre
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener personas:", err);
    res.status(500).json({ error: "Error al obtener personas" });
  }
};



const agregarPersona = async(req, res) =>{
  try{
    const{rut, nombre, correo, telefono }= req.body;

    // Validar campos obligatorios
    if ( !nombre || !correo || !telefono || !rut ) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
     // Validar si ya existe una persona con el mismo Rut
    const checkQuery = "SELECT * FROM persona WHERE rut = $1";
    const checkResult = await pool.query(checkQuery, [rut]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "El rut ingresado ya existe en el sistema.." });
    }
    const query = `
      INSERT INTO persona (nombre, correo, telefono, rut)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const params = [nombre, correo, telefono, rut];
    const result = await pool.query(query, params);

    res.status(201).json(result.rows[0]);

  }catch (err) {
    console.error("Error al agregar Arrendatario:", err);
    res.status(500).json({ error: "Error al agregar Arrendatario" });
  }
};
module.exports = { obtenerPersonas, agregarPersona };





