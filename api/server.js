const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'tienda_user',
  password: process.env.DB_PASSWORD || 'tienda_password',
  database: process.env.DB_DATABASE || 'tienda_db',
  port: process.env.DB_PORT || '3306'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      res.status(500).json({ error: 'Error al obtener los productos' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para obtener un producto por su ID
app.get('/api/productos/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ?', [productId], (err, results) => {
    if (err) {
      console.error(`Error al consultar el producto con ID ${productId}:`, err);
      res.status(500).json({ error: `Error al obtener el producto con ID ${productId}` });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: `Producto con ID ${productId} no encontrado` });
      return;
    }
    res.json(results[0]);
  });
});

// Endpoint para crear un nuevo producto (POST)
app.post('/api/productos', (req, res) => {
  const { imagen, nombre, descripcion, precio, npiezas } = req.body;
  if (!nombre || precio === undefined || npiezas === undefined) {
    return res.status(400).json({ error: 'Nombre, precio y número de piezas son campos requeridos.' });
  }

  const newProduct = { imagen, nombre, descripcion, precio, npiezas };
  db.query('INSERT INTO productos SET ?', newProduct, (err, result) => {
    if (err) {
      console.error('Error al crear el producto:', err);
      res.status(500).json({ error: 'Error al crear el producto' });
      return;
    }
    res.status(201).json({ message: 'Producto creado exitosamente', productId: result.insertId });
  });
});

// Endpoint para actualizar un producto existente (PUT)
app.put('/api/productos/:id', (req, res) => {
  const productId = req.params.id;
  const { imagen, nombre, descripcion, precio, npiezas } = req.body;

  if (!nombre || precio === undefined || npiezas === undefined) {
    return res.status(400).json({ error: 'Nombre, precio y número de piezas son campos requeridos para la actualización.' });
  }

  const updatedProduct = { imagen, nombre, descripcion, precio, npiezas };
  db.query('UPDATE productos SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
    if (err) {
      console.error(`Error al actualizar el producto con ID ${productId}:`, err);
      res.status(500).json({ error: `Error al actualizar el producto con ID ${productId}` });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: `Producto con ID ${productId} no encontrado para actualizar.` });
      return;
    }
    res.json({ message: `Producto con ID ${productId} actualizado exitosamente.` });
  });
});

// Endpoint para eliminar un producto (DELETE)
app.delete('/api/productos/:id', (req, res) => {
  const productId = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', [productId], (err, result) => {
    if (err) {
      console.error(`Error al eliminar el producto con ID ${productId}:`, err);
      res.status(500).json({ error: `Error al eliminar el producto con ID ${productId}` });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: `Producto con ID ${productId} no encontrado para eliminar.` });
      return;
    }
    res.json({ message: `Producto con ID ${productId} eliminado exitosamente.` });
  });
});

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});