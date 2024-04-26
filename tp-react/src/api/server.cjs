const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
}));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'InstrumentosDB',
  password: 'computacion6',
  port: 5432,
});

app.post('/api/instrumentos', async (req, res) => {
  const instrumento = req.body;
  console.log(instrumento);

  try {
      const {
        instrumento: nombre,
        marca,
        modelo,
        imagen,
        precio,
        costoEnvio,
        cantidadVendida,
        descripcion,
      } = instrumento;

      const query = `
        INSERT INTO "InstrumentosDB"."public"."instrumento"
        ("instrumento", "marca", "modelo", "imagen", "precio", "costoEnvio", "cantidadVendida", "descripcion")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;

      const values = [
        nombre,
        marca,
        modelo,
        imagen,
        parseFloat(precio),
        parseFloat(costoEnvio) || 0,
        parseInt(cantidadVendida),
        descripcion,
      ];

      await pool.query(query, values);

    res.status(200).json({ message: 'Datos insertados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al insertar los datos' });
  }
});

app.get('/api/instrumentos/list', async (req, res) => {
  try {
    // Realizar consulta a la base de datos para obtener todos los instrumentos
    const query = 'SELECT * FROM "InstrumentosDB"."public"."instrumento"';
    const { rows } = await pool.query(query);

    // Enviar los instrumentos como respuesta
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los instrumentos:', error);
    res.status(500).json({ error: 'Error al obtener los instrumentos' });
  }
});

app.get('/api/instrumentos/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Realizar consulta a la base de datos para obtener el instrumento por su ID
  const query = 'SELECT * FROM "InstrumentosDB"."public"."instrumento" WHERE "id" = $1';
    const { rows } = await pool.query(query , [id]);
    console.log(rows[0]);
    // Enviar el instrumento como respuesta
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el instrumento:', error);
    res.status(500).json({ error: 'Error al obtener el instrumento' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});