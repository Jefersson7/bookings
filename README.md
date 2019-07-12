# Bookings

## ¿Cómo correr este proyecto?

Despues de clonar, vaya al directorio del proyecto y ejecute:

### `npm install`

Para instalar los paquetes, después de instalados, debe correr:

### `npm start`

Para ejecutar la aplicación en modo desarrollo.<br>
Abra [http://localhost:3000](http://localhost:3000) Para verlo en el navegador.

La página se recargará cuando haga modificaciones.

## Consideraciones

Se usaron las siguientes componentes: `bootstrap`, `react-router`, `moment.js`, `reac-data-grid`, para el renderizado de los datos a traves de un data grid, y para las peticiones HTTP se usó `axios`.
Para el renderizado de datos, sólo se tomó la dirección y los nombres del cliente quien contrató los servicios, y además se filtran los bookingId por rangos de números, por ejemplo, desde el id 1011 al 1179 