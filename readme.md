API_REST

API REST construida con Node.js, Express 5 y TypeScript, con base de datos MySQL y autenticación mediante JWT.

Tecnologías

Área	Herramienta
Framework	Express 5
Lenguaje	TypeScript 5
Base de datos	MySQL (mysql2)
Autenticación	JSON Web Tokens (jsonwebtoken)
Hash de contraseñas	bcrypt / bcryptjs
Middleware	cors, morgan
Utilidades	chalk
Desarrollo	ts-node, nodemon

Instalación

git clone https://github.com/lukylu/API_REST.git
cd API_REST
npm install

Scripts disponibles

Comando	Descripción
npm run dev	Arranca el servidor en desarrollo con recarga automática (nodemon)
npm start	Ejecuta el servidor con ts-node (src/server.ts)
npm run build	Compila TypeScript a JavaScript (tsc)
npm run serve	Ejecuta la versión compilada (dist/server.js)

Estructura del proyecto

API_REST/
├── app-users/
├── src/            # Punto de entrada: src/server.ts
├── package.json
├── tsconfig.json
└── README.md

Licencia

ISC

Autor

Lucas Fernández Iglesias (@lukylu)