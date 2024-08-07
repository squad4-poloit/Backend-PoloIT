import express from "express"
import { connection  } from "./db.js";
const app = express()
const PORT = 3000;


app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Endpoint para mostrar información de animales
app.get('/animales', async (req, res) => {
  try {
      const [results] = await connection.execute('SELECT * FROM animales');
      res.json(results);
  } catch (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener los animales' });
  }
});

// Endpoint para crear animales de ejemplo
app.get('/animales/up', async (req, res) => {
  const ejemplos = [
      { nombre: 'León', especie: 'Panthera leo' },
      { nombre: 'Tigre', especie: 'Panthera tigris' },
      { nombre: 'Elefante', especie: 'Loxodonta africana' }
  ];

  const query = 'INSERT INTO animales (nombre, especie) VALUES ?';
  const values = ejemplos.map(ejemplo => [ejemplo.nombre, ejemplo.especie]);

  try {
      await connection.query(query, [values]);
      res.json({ message: 'Ejemplos insertados exitosamente' });
  } catch (err) {
      console.error('Error al insertar los ejemplos:', err);
      res.status(500).json({ error: 'Error al insertar los ejemplos' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})