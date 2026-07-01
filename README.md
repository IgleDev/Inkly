# 🖋️ Inkly

Plataforma de blogging colaborativo. Crea blogs, escribe posts con un editor por bloques (texto, títulos, imágenes, vídeo, citas) y gestiónalos en equipo con roles e invitaciones por email.

## ✨ Funcionalidades

- 🔐 Registro e inicio de sesión con autenticación JWT
- 📝 Editor de posts por bloques: párrafo, título, imagen, vídeo y cita, con orden personalizable
- 👥 Blogs gestionados por equipos (Teams), con roles `member` / `admin`
- ✉️ Invitaciones a equipos por email (Resend), con token único y caducidad a los 7 días
- 🖼️ Subida de imágenes (perfil y contenido de posts)
- 🔎 Filtrado de blogs por región y por tags
- ⭐ Guardado de blogs favoritos por usuario
- 🌍 Selección de región/país al registrarse

## 🏗️ Estructura del proyecto

```
Inkly/
├── client/   # Frontend — React + TypeScript + Vite
└── server/   # Backend — Node.js + Express API REST
```

## 🎨 Tecnologías — Frontend

- **React 19** + **TypeScript** + **Vite**
- **React Router v7** — enrutado y layouts (Auth, Blog, Account, Main, Info)
- **TanStack Query** — fetching y cache de datos del servidor
- **Zustand** — estado global
- **React Hook Form** + **Zod** — formularios y validación
- **Axios** — cliente HTTP
- **Tailwind CSS** — estilos
- **Headless UI** + **Heroicons** — componentes accesibles

## ⚙️ Tecnologías — Backend

- **Node.js** + **Express 5** + **TypeScript**
- **MongoDB** + **Mongoose** — base de datos
- **JWT** (`jsonwebtoken`) — autenticación
- **bcrypt** — hash de contraseñas
- **express-validator** — validación de entradas
- **Multer** — subida de ficheros
- **Resend** — envío de emails transaccionales
- **uuid**, **cors**, **dotenv**

## 📂 Modelo de datos

| Modelo | Descripción |
|---|---|
| `User` | Usuario: nombre, email, contraseña, foto de perfil, blogs guardados |
| `Blog` | Pertenece a un `Team`; título, descripción, tags, estado publicado/borrador |
| `Post` | Pertenece a un `Blog`; contenido como array de bloques tipados con orden |
| `Team` | Dueño + un blog asociado (relación 1:1) |
| `TeamMembership` | Relación usuario↔equipo con rol (`member`/`admin`) |
| `TeamInvitation` | Token, estado (`pending/accepted/declined/expired`), caducidad |

## 🔌 API — Endpoints principales

**Usuarios** (`/api/users`)
- `POST /` — Registro
- `POST /login` — Inicio de sesión
- `GET /user` — Usuario autenticado
- `GET /user/:id` / `GET /user/profile/:name` — Perfil público
- `PUT /edit-profile-account/:id` — Editar perfil

**Blogs** (`/api/blog`)
- `GET /` — Listado por región
- `GET /filter-by-tags` — Filtrado por tag
- `GET /:id` — Detalle de un blog
- `GET /get-team-blogs` — Blogs del equipo del usuario autenticado
- `POST /create` — Crear blog + post inicial
- `POST /save-blog` — Guardar blog en favoritos
- `PUT /edit-blog-published/:id` — Publicar/despublicar
- `DELETE /delete/:id` — Eliminar

**Equipos** (`/api/team`)
- `POST /:blogId/invite` — Invitar miembro por email
- `POST /invitation/:token/accept` — Aceptar invitación

**Subida de ficheros** (`/api/uploads`)
- `POST /` — Subir imagen

## 🚀 Puesta en marcha

### Requisitos

- Node.js ≥ 18
- Una instancia de MongoDB (local o Atlas)
- Una cuenta de [Resend](https://resend.com) para el envío de emails

### 1. Clonar el repositorio

```bash
git clone https://github.com/IgleDev/Inkly.git
cd Inkly
```

### 2. Backend

```bash
cd server
npm install
```

Crea un fichero `.env` en `server/` con:

```env
PORT=5000
MONGO_URI=tu_cadena_de_conexión_mongo
JWT_SECRET=tu_jwt
RESEND_API_KEY=tu_api_key_de_resend
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev     # entorno de desarrollo (nodemon + ts-node)
npm run build   # compila a dist/
npm start       # ejecuta la versión compilada
```

### 3. Frontend

```bash
cd client
npm install
npm run dev       # entorno de desarrollo (Vite)
npm run build     # build de producción
npm run preview   # previsualizar build
```

Por defecto el frontend corre en `http://localhost:5173` y el backend en `http://localhost:5000`.

## 📦 Despliegue

- **Frontend**: configurado para desplegarse en [Vercel](https://vercel.com) (`vercel.json` incluido)
- **Backend**: cualquier proveedor Node.js compatible con variables de entorno (Render, Railway, VPS...)

## 🛠️ Autor

Desarrollado por [**IgleDev**](https://github.com/IgleDev)
