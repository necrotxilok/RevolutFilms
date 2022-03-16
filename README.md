# Revolut Films

Aplicación creada con React JS para buscar y votar tus películas favoritas
(o las que no te gustan).

[Acceder a la aplicación](https://revolutfilms.ntkserver.com/)

## Detalles de la implementación

La aplicación consta de dos partes una para el Backend y otra pare el Frontend.

En la carpeta `server` tendríamos la API de comunicación de entre la App y la
API de [TMDB](https://www.themoviedb.org). He optado por desarrollar este punto
para poder encapsular la clave de API fuera de la App y evitar su uso por
parte de terceros.

En la carpeta `app` se encuentra el código fuente de la aplicación web
desarrollada con React JS y que se comunica directamente con la API a través
de dos métodos:

- Obtener un listado de películas paginado en orden de popularidad
- Obtener las películas que coinciden con un texto de búsqueda dado

Al iniciar la aplicación se ha montado un overlay que desaparece tras Iniciar
por primera vez usando animaciones de `GSAP`. Este overlay no vuelve a aparecer
a menos que se recargue la aplicación desde el navegador.

Para navegar por la aplicación se ha optado por usar `react-router-dom` usando
tres posibles rutas y una de error:

- `/` -> Página de inicio (Listado de películas)
- `/mylist` -> Listados de películas que te gustan y no te gustan
- `/search/<query>` -> Búsqueda de películas

Cuando se hace click en una película aparece la portada, el título, la sinopsis
y dos botones para puntuar la película. Al hacer click en alguno de ellos se
guarda la película en el listado correspondiente (Buenas/Malas) y que se pueden
ver en la pantalla de `mylist`. Además se muestra una notificación en la parte
inferior indicando la acción que acabas de realizar. Si se vuelve a pulsar sobre
una votación dada, la película se retira de los listados.

Cuando una película ha sido votada en los listados de películas se verá con
su icono correspondiente. Los listados se actualizan automáticamente con los
cambios haciendo uso de un único contexto a nivel de aplicación (`AppContext`).

La apertura de Modales (`components/Modal`) se ha desarrollado con la idea de
poder incluir diversos contenidos aunque actualmente sólo se usa para el
detalle de las películas. El sistema de modales usa una combinación de
`styled-compontents` y animaciones con `GSAP`.

El sistema de notificaciones (`components/Toast`) también hace uso de
`styled-compontents` y animaciones con `GSAP`. Las notificaciones desaparecen
a los 3 segundos (a menos que se haya relanzado otra que la sustituye).

La obtención de datos está centralizada bajo el objeto `data/FilmsProvider` que
contiene una serie de métodos para hacer las llamadas a las API o almacenar
datos en memoria (caché) evitando así hacer llamadas adicionales a la API.
También tiene toda la lógica de votaciones y guardado de películas que se
almacenan usando `localStorage` en el navegador.

Si la película no tiene portada se usa una imagen genérica en su lugar.


## Configuración

Acceder a la carpeta `server` e instalar dependencias:

```
$ cd server
$ npm install
```

Crear el archivo `.env` dentro de `server` con la API KEY de TMDB:

```
TMDB_API_KEY=<<__API_KEY__>>
```

Acceder a la carpeta `app` e instalar dependencias:

```
$ cd app
$ npm install
```

Opcionalmente se pueden configurar otros puertos para ejecutar el servidor,
pero es importante tener en cuenta que la App usa un proxy con el puerto 3001
por lo que si se cambia habría que actualizar el parámetro `proxy` en el archivo
`app/package.json`.


## Iniciar la aplicación

Iniciar el servidor:

```
$ cd server
$ npm start
```

Iniciar la aplicación:

```
$ cd app
$ npm start
```

Si todo va bien se abrirá la aplicación en el navegador.

> NOTA: Si no se ven las películas es posible que falle la clave API de TMDB
