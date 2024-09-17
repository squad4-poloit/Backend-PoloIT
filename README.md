# Backend Sistema de Gestión de inscripciones

Este es el backend un sistema de gestión de inscripciones a proyectos, desarrollado con Nodejs, TypeScript, Express y Mysql

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

- Tener instalado:
  - [Git](https://git-scm.com/)
  - Node.js LTS
    - [Pagina oficial](https://nodejs.org/en)
    - [Package Manager](https://nodejs.org/en/download/package-manager)

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
  - `.env` para producción
  - `.env.dev` para desarrollo
  - `.env.local` para desarrollo local
  - `.env.test` para testing

- Crear y definir variables de entorno por ambiente
  Ejemplo de variables de entorno:

    ```.env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"  #dev, prod, test
    DATABASE_URL="file:./local.db" #local, test
    PORT="5454"
    NODE_ENV="example"
    ```

#### 4.  Iniciar Base de Datos

```bash
npm run prisma-migrate:local
```

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
