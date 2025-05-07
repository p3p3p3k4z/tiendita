const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Variables de entorno para la conexión a la base de datos
const dbHost = process.env.DB_HOST || 'db';
const dbUser = process.env.DB_USER || 'root'; // Usamos root
const dbPassword = process.env.DB_PASSWORD || 'root_password'; // Contraseña de root
const dbDatabase = process.env.DB_DATABASE || 'tienda_db';
const dbPort = parseInt(process.env.DB_PORT, 10) || 3306;

let connection; // Declarar la conexión en un ámbito más amplio

function connectToDatabase() {
  connection = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase,
    port: dbPort,
    connectTimeout: 10000, // 10 segundos
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      setTimeout(connectToDatabase, 5000); // Reintentar después de 5 segundos
    } else {
      console.log('Conectado a la base de datos MySQL');
    }
  });

  connection.on('error', (err) => {
    console.error('Error de conexión:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectToDatabase(); // Reconectar si se pierde la conexión
    } else {
      console.error("Otro error de conexión:", err);
    }
  });
}

connectToDatabase(); // Iniciar el proceso de conexión

// Endpoint para obtener todos los productos
app.get('/api/productos', (req, res) => {
  if (!connection || connection.state === 'disconnected') {
    return res.status(500).json({ error: 'No hay conexión a la base de datos' });
  }
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
    res.json(results);
  });
});

// Endpoint para obtener un producto por su ID
app.get('/api/productos/:id', (req, res) => {
  if (!connection || connection.state === 'disconnected') {
    return res.status(500).json({ error: 'No hay conexión a la base de datos' });
  }
  const productId = req.params.id;
  connection.query('SELECT * FROM productos WHERE id = ?', [productId], (err, results) => {
    if (err) {
      console.error(`Error al consultar el producto con ID ${productId}:`, err);
      return res.status(500).json({ error: `Error al obtener el producto con ID ${productId}` });
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
  if (!connection || connection.state === 'disconnected') {
    return res.status(500).json({ error: 'No hay conexión a la base de datos' });
  }
  const { imagen, nombre, descripcion, precio, npiezas, categoria } = req.body;
  if (!nombre || precio === undefined || npiezas === undefined || !categoria) {
    return res.status(400).json({ error: 'Nombre, precio, número de piezas y categoría son campos requeridos.' });
  }

  const newProduct = { imagen, nombre, descripcion, precio, npiezas, categoria };
  connection.query('INSERT INTO productos SET ?', newProduct, (err, result) => {
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
  if (!connection || connection.state === 'disconnected') {
    return res.status(500).json({ error: 'No hay conexión a la base de datos' });
  }
  const productId = req.params.id;
  const { imagen, nombre, descripcion, precio, npiezas, categoria } = req.body;

  if (!nombre || precio === undefined || npiezas === undefined || !categoria) {
    return res.status(400).json({ error: 'Nombre, precio, número de piezas y categoría son campos requeridos para la actualización.' });
  }

  const updatedProduct = { imagen, nombre, descripcion, precio, npiezas, categoria };
  connection.query('UPDATE productos SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
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
  if (!connection || connection.state === 'disconnected') {
    return res.status(500).json({ error: 'No hay conexión a la base de datos' });
  }
  const productId = req.params.id;
  connection.query('DELETE FROM productos WHERE id = ?', [productId], (err, result) => {
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
