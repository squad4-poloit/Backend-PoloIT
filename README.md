# Backend Sistema de Gestión de inscripciones

Este es el backend un sistema de gestión de inscripciones a Mentorias, desarrollado con Nodejs, TypeScript, Express y PostgreSQL

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

- [Git](https://git-scm.com/)
- [Node.js LTS](https://nodejs.org/en)
- [PostgresSQL 16.4](https://www.postgresql.org/download/)
  - [Windows](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

### Instalación 🔧

#### 1. Clonar repositorio

```bash
git clone https://github.com/squad4-poloit/Backend-PoloIT.git
```

#### 2.  Instalar dependencias

```bash
cd Backend-PoloIT
npm install
```

#### 4. Preparar Variables de entorno

- Los script npm están preparados para cargar las variables de entorno definidas en archivos `.env` para cada ambiente
  - `.env` -> NODE_ENV=production
  - `.env.dev` -> NODE_ENV=development
  - `.env.local` -> NODE_ENV=development
  - `.env.test` -> NODE_ENV=test

- Crear y definir variables de entorno
  - DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
  - DATABASE_LOCAL="file:./local.db"
  - PORT=3030
  - NODE_ENV=development

#### 4.  Iniciar Base de Datos

```bash
npm run prisma-migrate:<ambiente>
```

Reemplazar `<ambiente>` por:

- `production` para ejecuta
- `development`
- `local`
- `test`

#### 5. Ejecutar Proyecto

```bash
npm run local
```

## Ejecutando las pruebas ⚙️

```bash
npm run test:local
```

## Despliegue 📦

`In Progress`

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

## Estructura  de carpetas 🧱

`In Progress`

## Versionado 📌

`In Progress`

## Tareas

- [x] Implementar multiples entornos [prod, dev, dev:local, test]
- [ ] Documentar en el Readme como ejecutar el proyecto
- [ ] Configurar Typescript Path Aliases
- [ ] Documentar la estructura del proyecto
- [ ] Documentar Apis con Swagger
- [ ] Implementar validaciones en controladores con Zod
- [ ] Crear un diagrama de la base de datos
