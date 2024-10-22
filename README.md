# Backend Sistema de Gestión de inscripciones

Este es el backend un sistema de gestión de inscripciones a Mentorias, desarrollado con Nodejs, TypeScript, Express y PostgreSQL

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

## Clonar repositorio

```bash
git clone https://github.com/squad4-poloit/Backend-PoloIT.git
```

## Instalación con Docker

Importante tener Docker instalado

### Ejecutar docker compose

```bash
docker compose up -d
```

## Instalación local

### Pre-requisitos 📋

- [Git](https://git-scm.com/)
- [Node.js LTS](https://nodejs.org/en)
- [PostgresSQL 16.4](https://www.postgresql.org/download/)

### Instalación 🔧

#### 2.  Instalar dependencias

```bash
cd Backend-PoloIT
npm install
```

#### 3. Preparar Variables de entorno en .env

```.env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/BackPoloIT?schema=public"
PORT=3000
NODE_ENV=production
```

Importante en PostgreSQL se debe tener usuario: postgres , contraseña: admin y una base de datos: BackPoloIT
También puede reemplazar los valores que en la url para que correspondan a su configuración.

#### 4. Iniciar el backend

```bash
npx prisma generate
```

```bash
npm build
```

```bash
npx prisma migrate deploy
```

```bash
npx prisma migrate db seed
```

```bash
npm run start
```

## Construido con 🛠️

- [Nodejs](https://nodejs.org/en) - Entorno de ejecución
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación fuertemente tipado
- [Express](https://expressjs.com/es/) -  Framework backend
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
- [Prisma ORM](https://www.prisma.io/orm) - Object Relational Mapping
- [Zod](https://zod.dev/) - Schema validation
- [Swagger](https://swagger.io/) - Design and document APIs
- [Biome](https://biomejs.dev/) - Format, lint, and more
- [Jest](https://jestjs.io/) - Testing Framework
- [Docker](https://www.docker.com/) - Container tool
- [Jenkins](https://www.jenkins.io/) - Servidor de automatización
