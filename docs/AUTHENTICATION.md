# Sistema de Autenticación JWT

## Descripción

El sistema implementa autenticación mediante JWT (JSON Web Tokens) y autorización basada en roles. Cada usuario debe contar con un token válido para acceder a los endpoints protegidos, y según su rol, se restringe el acceso a determinadas funcionalidades.

## Roles de Usuario

### 1. ADMIN
- **Acceso completo** a todas las funcionalidades del sistema
- Puede crear, leer, actualizar y eliminar cualquier entidad
- Puede registrar nuevos usuarios
- Puede gestionar roles y permisos

### 2. DOCTOR
- **Acceso a pacientes, citas, órdenes médicas y medicamentos**
- Puede crear y actualizar sus propios registros
- Puede ver información de otros doctores
- **No puede eliminar registros**

### 3. NURSE
- **Acceso de solo lectura** a la mayoría de entidades
- Puede ver pacientes, doctores, citas, órdenes médicas y medicamentos
- **No puede crear, actualizar o eliminar registros**

### 4. RECEPTIONIST
- **Acceso limitado** para gestión de citas y pacientes
- Puede ver información básica de doctores
- **No puede acceder a órdenes médicas o medicamentos**

## Endpoints de Autenticación

### 1. Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta exitosa:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 1,
    "username": "admin",
    "email": "admin@hospital.com",
    "role": "ADMIN"
  }
}
```

### 2. Registro de Usuario (Solo ADMIN)
```http
POST /auth/register
Authorization: Bearer <token_admin>
Content-Type: application/json

{
  "username": "doctor.garcia",
  "email": "doctor.garcia@hospital.com",
  "password": "password123",
  "role": "DOCTOR",
  "doctorId": 1
}
```

### 3. Perfil de Usuario
```http
GET /auth/profile
Authorization: Bearer <token>
```

## Uso de Tokens

### 1. Obtener Token
1. Hacer login con credenciales válidas
2. Copiar el `access_token` de la respuesta
3. Usar el token en el header `Authorization: Bearer <token>`

### 2. Usar Token en Requests
```http
GET /doctors
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Protección de Endpoints

### Ejemplo de Endpoint Protegido
```typescript
@Get()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
@ApiBearerAuth()
findAll() {
  return this.doctorService.findAll();
}
```

### Niveles de Protección

1. **Sin protección**: Endpoints públicos (solo login)
2. **JwtAuthGuard**: Requiere token válido
3. **RolesGuard**: Requiere rol específico
4. **Combinación**: Requiere token válido Y rol específico

## Configuración

### Variables de Entorno
```env
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
```

### Configuración JWT
```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  signOptions: { expiresIn: '24h' },
})
```

## Usuario Administrador Inicial

Se crea automáticamente un usuario administrador con las siguientes credenciales:

- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@hospital.com`
- **Role**: `ADMIN`

### Crear Usuario Admin Manualmente
```bash
npx ts-node src/scripts/create-admin-user.ts
```

## Seguridad

### 1. Encriptación de Contraseñas
- Las contraseñas se encriptan usando bcrypt con salt rounds = 10
- No se almacenan contraseñas en texto plano

### 2. Validación de Tokens
- Los tokens se validan en cada request
- Se verifica que el usuario esté activo
- Se verifica la expiración del token

### 3. Roles y Permisos
- Validación estricta de roles en cada endpoint
- No se puede acceder a funcionalidades fuera del rol asignado

## Ejemplos de Uso

### 1. Login como Admin
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 2. Crear Doctor (como Admin)
```bash
curl -X POST http://localhost:3000/doctors \
  -H "Authorization: Bearer <token_admin>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1234567890",
    "firstName": "Carlos",
    "lastName": "García",
    "email": "carlos.garcia@hospital.com",
    "phone": "3001234567",
    "address": "Calle 45 #23-12",
    "city": "Medellín",
    "professionalCard": "TP-12345",
    "admissionDate": "2023-01-15"
  }'
```

### 3. Ver Doctores (como Nurse)
```bash
curl -X GET http://localhost:3000/doctors \
  -H "Authorization: Bearer <token_nurse>"
```

## Manejo de Errores

### 401 Unauthorized
- Token no proporcionado
- Token inválido
- Token expirado
- Usuario inactivo

### 403 Forbidden
- Rol insuficiente para acceder al endpoint
- Usuario no tiene permisos para la operación

### 400 Bad Request
- Credenciales inválidas en login
- Datos de registro inválidos

## Mejores Prácticas

1. **Nunca compartir tokens** en código o logs
2. **Usar HTTPS** en producción
3. **Rotar secretos JWT** periódicamente
4. **Implementar refresh tokens** para mayor seguridad
5. **Logging de autenticación** para auditoría
6. **Rate limiting** en endpoints de autenticación 