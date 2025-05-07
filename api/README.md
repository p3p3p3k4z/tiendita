*Obtener todos los productos:
```Bash
curl http://localhost:8081/api/productos
```
Esto debería devolverte un array JSON con todos los productos de tu base de datos, incluyendo el nuevo campo categoria.

*Obtener un producto por ID (reemplaza 1 con un ID existente):
```Bash
curl http://localhost:8081/api/productos/1
```
Esto debería devolver un objeto JSON con la información del producto con el ID 1, incluyendo la categoria.

Crear un nuevo producto (POST):
```Bash
curl -X POST -H "Content-Type: application/json" -d '{"imagen": "nuevo_peluche.webp", "nombre": "Nuevo Peluche", "descripcion": "Un peluche de prueba", "precio": 25.99, "npiezas": 10, "categoria": "prueba"}' http://localhost:8081/api/productos
```
Esto enviará una petición POST al endpoint de creación de productos. Deberías recibir una respuesta JSON indicando que el producto se creó exitosamente y el productId.

Actualizar un producto existente (PUT) (reemplaza 1 con un ID existente):
```Bash
curl -X PUT -H "Content-Type: application/json" -d '{"nombre": "Peluche Actualizado", "precio": 29.99, "npiezas": 15, "categoria": "actualizado"}' http://localhost:8081/api/productos/1
```
Esto enviará una petición PUT para actualizar el producto con el ID 1. Deberías recibir una respuesta JSON indicando que el producto se actualizó.

Eliminar un producto (DELETE) (reemplaza 1 con un ID existente):
```Bash
curl -X DELETE http://localhost:8081/api/productos/1
```
Esto enviará una petición DELETE para eliminar el producto con el ID 1. Deberías recibir una respuesta JSON indicando que el producto se eliminó.

