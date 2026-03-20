# Aplicación de Monitoreo NOC

## Descripción

Esta es una aplicación de monitoreo para un Centro de Operaciones de Red (NOC) desarrollada en Node.js con TypeScript. El proyecto permite monitorear servicios, registrar logs de diferentes niveles de severidad y enviar notificaciones por correo electrónico. Utiliza múltiples bases de datos (MongoDB y PostgreSQL) y soporta diferentes fuentes de datos para los logs.

## Características

- **Monitoreo de Servicios**: Verificación periódica del estado de servicios web.
- **Sistema de Logs**: Registro de logs con niveles de severidad (LOW, MEDIUM, HIGH).
- **Múltiples Datasources**: Soporte para File System, MongoDB, PostgreSQL y mas.
- **Notificaciones por Email**: Envío de logs por correo electrónico.
- **Tareas Programadas**: Uso de Cron para verificaciones automáticas.
- **Arquitectura Limpia**: Separación en capas (Domain, Infrastructure, Presentation).

## Tecnologías Utilizadas

- **Node.js** con **TypeScript**
- **Prisma** para ORM con PostgreSQL
- **Mongoose** para MongoDB
- **Docker Compose** para contenedores
- **Nodemailer** para envío de emails
- **Cron** para tareas programadas
- **Express** (implicado en la estructura)

## Prerrequisitos

- Node.js (versión 16 o superior)
- Docker y Docker Compose
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd aplicacion-de-monitoreo-noc
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   MONGO_USER=tu_usuario_mongo
   MONGO_PASS=tu_password_mongo
   MONGO_URL=mongodb://tu_usuario_mongo:tu_password_mongo@localhost:27017
   MONGO_DB_NAME=nombre_base_datos_mongo

   POSTGRES_USER=tu_usuario_postgres
   POSTGRES_DB=nombre_base_datos_postgres
   POSTGRES_PASSWORD=tu_password_postgres

   # Otras variables según sea necesario (emails, etc.)
   ```

4. Inicia los contenedores de base de datos:
   ```bash
   docker-compose up -d
   ```

5. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

## Uso

### Desarrollo

Para ejecutar en modo desarrollo con recarga automática:
```bash
npm run dev
```

### Producción

Para construir y ejecutar en producción:
```bash
npm run build
npm start
```

### Comandos Adicionales

- `npm run tsx`: Ejecuta con tsx watch.

## Estructura del Proyecto

```
src/
├── app.ts                 # Punto de entrada principal
├── config/                # Configuraciones (plugins, envs)
├── data/                  # Conexiones a bases de datos
│   ├── mongo/             # Configuración MongoDB
│   └── postgres/          # Configuración PostgreSQL
├── domain/                # Lógica de negocio
│   ├── datasources/       # Interfaces de datasources
│   ├── entities/          # Entidades del dominio
│   ├── repository/        # Interfaces de repositorios
│   └── use-cases/         # Casos de uso
├── infrastructure/        # Implementaciones concretas
│   ├── datasources/       # Implementaciones de datasources
│   └── repositories/      # Implementaciones de repositorios
├── presentation/          # Capa de presentación
│   ├── server.ts          # Servidor principal
│   ├── cron/              # Servicios de cron
│   └── email/             # Servicios de email
└── generated/             # Código generado por Prisma
```

## Base de Datos

### PostgreSQL (con Prisma)
- Modelo: `LogModel` con campos id, message, origin, level, createdAt.

### MongoDB (Con Mongoose)
- Usado para logs adicionales.

## API

La aplicación expone endpoints para:
- Verificar servicios
- Obtener logs
- Enviar notificaciones

(Detalles específicos en el código de `presentation/server.ts`)



