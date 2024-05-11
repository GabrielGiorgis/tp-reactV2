const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "InstrumentosDB",
  password: "1234",
  port: 5432,
});

// CRUD
// Create
app.post("/api/instrumentos", async (req, res) => {
  const instrumento = req.body;

  try {
    const {
      instrumento: nombre,
      marca,
      modelo,
      imagen,
      precio,
      costoenvio,
      cantidadvendida,
      descripcion,
    } = instrumento;

    const query = `
        INSERT INTO "InstrumentosDB"."public"."instrumento"
        ("instrumento", "marca", "modelo", "imagen", "precio", "costoenvio", "cantidadvendida", "descripcion")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING "id"
      `;

    const values = [
      nombre,
      marca,
      modelo,
      imagen,
      parseFloat(precio),
      parseFloat(costoenvio) || 0,
      parseInt(cantidadvendida),
      descripcion,
    ];

    const { rows } = await pool.query(query, values);
    const nuevoInstrumento = rows[0];
    res.status(201).json(nuevoInstrumento);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Error al insertar los datos" });

  }
});

// Read all
app.get("/api/instrumentos/list", async (req, res) => {
  try {
    // Realizar consulta a la base de datos para obtener todos los instrumentos
    const query = 'SELECT * FROM "InstrumentosDB"."public"."instrumento"';
    const { rows } = await pool.query(query);

    // Enviar los instrumentos como respuesta
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los instrumentos:", error);
    res.status(500).json({ error: "Error al obtener los instrumentos" });
  }
});

// Read one
app.get("/api/instrumentos/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Realizar consulta a la base de datos para obtener el instrumento por su ID
    const query =
      'SELECT * FROM "InstrumentosDB"."public"."instrumento" WHERE "id" = $1';
    const { rows } = await pool.query(query, [id]);
    console.log(rows[0]);
    // Enviar el instrumento como respuesta
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el instrumento:", error);
    res.status(500).json({ error: "Error al obtener el instrumento" });
  }
});

// Update
app.put("/api/instrumentos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    instrumento: nombre,
    marca,
    modelo,
    imagen,
    precio,
    costoenvio,
    cantidadvendida,
    descripcion,
  } = req.body;

  console.log(req.body);

  try {
    const query = `
      UPDATE "InstrumentosDB"."public"."instrumento"
      SET instrumento = '${nombre}', marca = '${marca}', modelo = '${modelo}', imagen = '${imagen}', precio = ${parseFloat(precio)}, costoenvio = ${parseFloat(costoenvio)}, cantidadvendida = ${parseInt(cantidadvendida)}, descripcion = '${descripcion}'
      WHERE id = ${id}
    `;
    console.log(query);
    const response = await pool.query(query);
    console.log(response);
    res.status(200).json({ message: "Instrumento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el instrumento:", error);
    res.status(500).json({ error: "Error al actualizar el instrumento" });
  }
});

// Delete
app.delete("/api/instrumentos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query =
      'DELETE FROM "InstrumentosDB"."public"."instrumento" WHERE "id" = $1';
    await pool.query(query, [id]);
    res.status(200).json({ message: "Instrumento eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el instrumento:", error);
    res.status(500).json({ error: "Error al eliminar el instrumento" });
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
