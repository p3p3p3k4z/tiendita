# Tiendita de peluches
- Por el momento ya pude integrar el docker de forma correcta aparentemente.
- Agregador sql inicial
- intento de api

### Docker
* Para iniciarlo la primera vez
    ```bash
    docker-compose up -d --build
    ```
* Ejecutar normal el proyecto
    ```bash
    docker-compose up -d 
    ```
* Para correr algun servicio en especifico
    ```bash
    docker start mysql_tienda
    docker start tienda_api
    docker start tienda_web
    ```

NOTAS: aprendi que con el docker no es instantaneo el levantamiento de la bd. Por lo cual hay que hacer un retardo en la api.
Por el momento tome el root en la bd para la api, es mala practica pero fue necesario para ver su funcionamiento correcto.
