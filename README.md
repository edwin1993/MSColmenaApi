# 🏥 MSColmenaAPI - Sistema de Gestión Médica

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <strong>Sistema de Gestión Médica construido con NestJS y Clean Architecture</strong>
</p>

## 📋 Descripción

MSColmenaAPI es una API REST completa para la gestión de un sistema médico que incluye:

- **Gestión de Pacientes**: Registro y administración de información de pacientes
- **Gestión de Doctores**: Control de médicos y especialistas
- **Citas Médicas**: Programación y seguimiento de citas
- **Órdenes Médicas**: Generación y gestión de órdenes médicas
- **Medicamentos**: Control de inventario de medicamentos
- **Autenticación**: Sistema de autenticación y autorización con JWT

## 🏗️ Arquitectura

El proyecto está construido siguiendo los principios de **Clean Architecture** con las siguientes capas:

```
┌─────────────────────────────────────────────────────────────┐
│                    Interface Layer                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Controllers │ │    DTOs     │ │   Guards    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  Application Layer                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   Services  │ │ Use Cases   │ │ Validators  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Domain Layer                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  Entities   │ │Repositories │ │  Business   │           │
│  │             │ │ Interfaces  │ │   Rules     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                Infrastructure Layer                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Repositories│ │   Database  │ │   External  │           │
│  │Implement.   │ │   (Prisma)  │ │   Services  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

### 📁 Estructura del Proyecto

```
src/
├── domain/                    # Capa de Dominio
│   ├── patient/              # Entidades y repositorios de pacientes
│   ├── doctor/               # Entidades y repositorios de doctores
│   ├── appointment/          # Entidades y repositorios de citas
│   ├── medical-order/        # Entidades y repositorios de órdenes médicas
│   ├── medication/           # Entidades y repositorios de medicamentos
│   └── auth/                 # Entidades y repositorios de autenticación
├── application/              # Capa de Aplicación
│   ├── patient/              # Servicios de aplicación para pacientes
│   ├── doctor/               # Servicios de aplicación para doctores
│   ├── appointment/          # Servicios de aplicación para citas
│   ├── medical-order/        # Servicios de aplicación para órdenes médicas
│   ├── medication/           # Servicios de aplicación para medicamentos
│   └── auth/                 # Servicios de aplicación para autenticación
├── infrastructure/           # Capa de Infraestructura
│   ├── patient/              # Implementaciones de repositorios
│   ├── doctor/               # Implementaciones de repositorios
│   ├── appointment/          # Implementaciones de repositorios
│   ├── medical-order/        # Implementaciones de repositorios
│   ├── medication/           # Implementaciones de repositorios
│   └── auth/                 # Implementaciones de repositorios
└── interface/                # Capa de Interfaz
    ├── patient/              # Controladores y DTOs
    ├── doctor/               # Controladores y DTOs
    ├── appointment/          # Controladores y DTOs
    ├── medical-order/        # Controladores y DTOs
    ├── medication/           # Controladores y DTOs
    └── auth/                 # Controladores y DTOs
```

## 🚀 Tecnologías Utilizadas

- **Framework**: [NestJS](https://nestjs.com/) - Framework progresivo de Node.js
- **Base de Datos**: [MySQL](https://www.mysql.com/) con [Prisma ORM](https://www.prisma.io/)
- **Autenticación**: [JWT](https://jwt.io/) (JSON Web Tokens)
- **Validación**: [class-validator](https://github.com/typestack/class-validator)
- **Documentación**: [Swagger/OpenAPI](https://swagger.io/)
- **Testing**: [Jest](https://jestjs.io/) para pruebas unitarias y e2e
- **Linting**: [ESLint](https://eslint.org/) con configuración de NestJS

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- MySQL (versión 8.0 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd MSColmenaAPI
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env basado en .env.example
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:
```env
# Database
DATABASE_URL="mysql://usuario:password@localhost:3306/mscolmena"

# JWT
JWT_SECRET="tu-jwt-secret-super-seguro"
JWT_EXPIRES_IN="24h"

# Application
PORT=3000
NODE_ENV=development
```

4. **Configurar la base de datos**
```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Poblar la base de datos con datos de prueba
npx prisma db seed
```

5. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

## 🧪 Testing

```bash
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov

# Pruebas en modo watch
npm run test:watch
```

## 📚 Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva de la API en:

- **Swagger UI**: http://localhost:3000/api
- **ReDoc**: http://localhost:3000/api-json

### Endpoints Principales

#### 🔐 Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/profile` - Obtener perfil del usuario

#### 👥 Pacientes
- `GET /patients` - Obtener todos los pacientes
- `POST /patients` - Crear nuevo paciente
- `GET /patients/:id` - Obtener paciente por ID
- `PUT /patients/:patientId` - Actualizar paciente
- `DELETE /patients/:patientId` - Eliminar paciente

#### 👨‍⚕️ Doctores
- `GET /doctors` - Obtener todos los doctores
- `POST /doctors` - Crear nuevo doctor
- `GET /doctors/:id` - Obtener doctor por ID
- `PUT /doctors/:doctorId` - Actualizar doctor
- `DELETE /doctors/:doctorId` - Eliminar doctor

#### 📅 Citas
- `GET /appointments` - Obtener todas las citas
- `POST /appointments` - Crear nueva cita
- `GET /appointments/:id` - Obtener cita por ID
- `PUT /appointments/:appointmentId` - Actualizar cita
- `DELETE /appointments/:appointmentId` - Eliminar cita

#### 📋 Órdenes Médicas
- `GET /medical-orders` - Obtener todas las órdenes médicas
- `POST /medical-orders` - Crear nueva orden médica
- `GET /medical-orders/:id` - Obtener orden médica por ID
- `PUT /medical-orders/:orderId` - Actualizar orden médica
- `DELETE /medical-orders/:orderId` - Eliminar orden médica

#### 💊 Medicamentos
- `GET /medications` - Obtener todos los medicamentos
- `POST /medications` - Crear nuevo medicamento
- `GET /medications/:id` - Obtener medicamento por ID
- `PUT /medications/:medicationId` - Actualizar medicamento
- `DELETE /medications/:medicationId` - Eliminar medicamento

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Ejecutar en modo desarrollo con hot reload
npm run start:debug        # Ejecutar en modo debug
npm run start:prod         # Ejecutar en modo producción

# Testing
npm run test               # Ejecutar pruebas unitarias
npm run test:watch         # Ejecutar pruebas en modo watch
npm run test:cov           # Ejecutar pruebas con cobertura
npm run test:debug         # Ejecutar pruebas en modo debug
npm run test:e2e           # Ejecutar pruebas end-to-end

# Base de datos
npm run prisma:generate    # Generar cliente de Prisma
npm run prisma:migrate     # Ejecutar migraciones
npm run prisma:studio      # Abrir Prisma Studio
npm run db:seed            # Poblar base de datos

# Linting y formateo
npm run lint               # Ejecutar ESLint
npm run lint:fix           # Corregir errores de ESLint automáticamente
npm run format             # Formatear código con Prettier
```

## 🗄️ Base de Datos

El proyecto utiliza MySQL con Prisma ORM. El esquema de la base de datos incluye las siguientes entidades principales:

- **Users**: Usuarios del sistema con roles
- **Patients**: Información de pacientes
- **Doctors**: Información de médicos
- **Appointments**: Citas médicas
- **MedicalOrders**: Órdenes médicas
- **Medications**: Medicamentos disponibles

### Migraciones

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (solo desarrollo)
npx prisma migrate reset
```

## 🔐 Autenticación y Autorización

El sistema utiliza JWT para la autenticación y implementa un sistema de roles:

- **ADMIN**: Acceso completo a todas las funcionalidades
- **DOCTOR**: Acceso a gestión de pacientes, citas y órdenes médicas
- **NURSE**: Acceso limitado a ciertas funcionalidades
- **RECEPTIONIST**: Acceso básico para registro de pacientes

### Uso de Guards

```typescript
// Proteger ruta con autenticación
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}

// Proteger ruta con roles específicos
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'DOCTOR')
@Get('patients')
getPatients() {
  return this.patientService.findAll();
}
```

## 🚀 Despliegue

### Variables de Entorno de Producción

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="mysql://usuario:password@host:puerto/base_datos"
JWT_SECRET="jwt-secret-super-seguro-y-largo"
JWT_EXPIRES_IN="24h"
```

### Docker (Opcional)

```bash
# Construir imagen
docker build -t mscolmena-api .

# Ejecutar contenedor
docker run -p 3000:3000 mscolmena-api
```

## 📝 Convenciones de Código

### Commits

El proyecto sigue las convenciones de [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nuevas características
- `fix:` Correcciones de bugs
- `docs:` Documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Pruebas
- `chore:` Tareas de mantenimiento

### Estructura de Commits por Módulo

Cada módulo se commitea por separado siguiendo la Clean Architecture:

```
feat: implementar módulo [Nombre] con Clean Architecture
- Domain: entidad [Nombre] y repositorio
- Application: servicio de aplicación
- Infrastructure: implementación Prisma
- Interface: controlador y DTOs
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 👥 Autores

- **Edwin Fernando Avila Coronado** - *Desarrollo inicial* - [edwin1993](https://github.com/edwin1993)
