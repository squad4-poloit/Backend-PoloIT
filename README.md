# Backend Sistema de Gestión de Inscripciones a Mentorías

Este es el backend de un sistema de gestión de inscripciones a mentorías, desarrollado con Node.js, TypeScript, Express y PostgreSQL. Se encarga de manejar la lógica de negocio y la persistencia de datos, utilizando tecnologías modernas como Prisma ORM y Zod para la validación de esquemas.

## Tabla de Contenidos

- [Backend Sistema de Gestión de Inscripciones a Mentorías](#backend-sistema-de-gestión-de-inscripciones-a-mentorías)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Comenzando 🚀](#comenzando-)
    - [Clonar repositorio](#clonar-repositorio)
    - [Instalación con Docker](#instalación-con-docker)
  - [Instalación local](#instalación-local)
    - [Pre-requisitos 📋](#pre-requisitos-)
    - [Instalación 🔧](#instalación-)
  - [Backend en Producción 🚀](#backend-en-producción-)
  - [Documentación de la API 📄](#documentación-de-la-api-)
  - [Comandos Útiles](#comandos-útiles)
  - [Tecnologías Utilizadas 🛠️](#tecnologías-utilizadas-️)

## Comenzando 🚀

### Clonar repositorio

Primero, clona el repositorio:

```bash
git clone https://github.com/squad4-poloit/Backend-PoloIT.git
```

### Instalación con Docker

Asegúrate de tener Docker instalado. Luego, ejecuta los siguientes comandos para levantar el entorno de desarrollo:

```bash
docker compose up -d
```

Esto creará los contenedores necesarios y levantará la aplicación.

## Instalación local

### Pre-requisitos 📋

Antes de continuar, asegúrate de tener instalados los siguientes programas:

- [Git](https://git-scm.com/)
- [Node.js LTS](https://nodejs.org/en)
- [PostgreSQL 16.4](https://www.postgresql.org/download/)

### Instalación 🔧

1. Instala las dependencias:

```bash
cd Backend-PoloIT
npm install
```

2. Prepara las variables de entorno en un archivo `.env`:

```bash
DATABASE_URL="postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_bd>?schema=public"
PORT=3000
NODE_ENV=production
```

> **Nota:** Asegúrate de reemplazar `<usuario>`, `<contraseña>` y `<nombre_bd>` con tus valores de configuración de PostgreSQL.

3. Genera los archivos de Prisma:

```bash
npx prisma generate
```

4. Realiza la migración de la base de datos:

```bash
npx prisma migrate deploy
```

5. Poblar la base de datos con datos de prueba:

```bash
npx prisma db seed
```

6. Finalmente, compila y levanta el servidor:

```bash
npm run build
npm run start
```

Tu backend debería estar corriendo en `http://localhost:3000`.

## Backend en Producción 🚀

El backend esta desplegada en un servidor en producción utilizando Docker.

- Puede ingresar en la siguiente url
  `https://backend.squad4-poloit.xyz/`

- Para ver la documentación de la api interactiva
    `https://backend.squad4-poloit.xyz/api/documentation`

## Documentación de la API 📄

La API está documentada utilizando Swagger. Para visualizar la documentación:

1. Levanta el backend en tu entorno de desarrollo o producción.
2. Accede a la documentación de Swagger en la siguiente URL:

```
http://localhost:3000/api/documentation
```

Esta interfaz te permite visualizar y probar todas las rutas disponibles de la API de forma interactiva. Cada endpoint incluye detalles sobre los parámetros, las respuestas y los errores posibles.

## Comandos Útiles

- **Levantar el servidor en modo desarrollo:**

  ```bash
  npm run dev
  ```

- **Limpiar la base de datos y cargar con datos de prueba:**

```bash
npx prisma migrate reset
```

## Tecnologías Utilizadas 🛠️

Este proyecto fue construido utilizando las siguientes herramientas:

- [Node.js](https://nodejs.org/en) - Entorno de ejecución JavaScript
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación tipado
- [Express](https://expressjs.com/es/) - Framework backend minimalista
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gestión de bases de datos relacional
- [Prisma ORM](https://www.prisma.io/) - Mapeo objeto-relacional (ORM) para bases de datos
- [Zod](https://zod.dev/) - Validación de esquemas
- [Swagger](https://swagger.io/) - Herramienta para el diseño y documentación de APIs
- [Biome](https://biomejs.dev/) - Formateador y linter de código
- [Jest](https://jestjs.io/) - Framework de pruebas
- [Docker](https://www.docker.com/) - Contenerización y despliegue
- [Jenkins](https://www.jenkins.io/) - Automatización CI/CD
