# Sistema de Pruebas Unitarias

## Descripción

El proyecto implementa un sistema completo de pruebas unitarias utilizando Jest y el framework de testing de NestJS. Las pruebas cubren todos los componentes del sistema de autenticación JWT, incluyendo entidades, servicios, repositorios, controladores y guards.

## Estructura de Pruebas

```
src/
├── domain/auth/__tests__/
│   └── user.entity.spec.ts          # Pruebas de la entidad User
├── application/auth/__tests__/
│   └── auth.service.spec.ts         # Pruebas del servicio de autenticación
├── infrastructure/auth/__tests__/
│   ├── prisma-user.repository.spec.ts  # Pruebas del repositorio
│   ├── jwt.strategy.spec.ts         # Pruebas de la estrategia JWT
│   ├── roles.guard.spec.ts          # Pruebas del guard de roles
│   └── auth.module.spec.ts          # Pruebas del módulo completo
└── interface/auth/__tests__/
    ├── auth.controller.spec.ts      # Pruebas del controlador
    └── auth.dto.spec.ts             # Pruebas de validación de DTOs
```

## Comandos de Testing

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch
```bash
npm run test:watch
```

### Ejecutar pruebas con cobertura
```bash
npm run test:cov
```

### Ejecutar pruebas en modo debug
```bash
npm run test:debug
```

## Cobertura de Pruebas

### 1. Entidad User (`user.entity.spec.ts`)
- ✅ Creación de usuarios con todos los campos
- ✅ Creación con valores por defecto
- ✅ Validación de roles de usuario
- ✅ Inmutabilidad de propiedades

### 2. Servicio de Autenticación (`auth.service.spec.ts`)
- ✅ Validación de credenciales de usuario
- ✅ Login exitoso con generación de JWT
- ✅ Login fallido con credenciales inválidas
- ✅ Registro de usuarios con validaciones
- ✅ Manejo de errores de duplicación
- ✅ Búsqueda de usuarios por ID y username

### 3. Repositorio de Usuarios (`prisma-user.repository.spec.ts`)
- ✅ Creación de usuarios
- ✅ Búsqueda por diferentes criterios
- ✅ Actualización de usuarios
- ✅ Eliminación de usuarios
- ✅ Manejo de campos excluidos en updates

### 4. Estrategia JWT (`jwt.strategy.spec.ts`)
- ✅ Validación de tokens válidos
- ✅ Rechazo de usuarios inexistentes
- ✅ Rechazo de usuarios inactivos
- ✅ Configuración correcta de la estrategia

### 5. Guard de Roles (`roles.guard.spec.ts`)
- ✅ Acceso permitido con roles válidos
- ✅ Acceso denegado con roles insuficientes
- ✅ Manejo de endpoints sin restricciones
- ✅ Validación de usuarios sin roles
- ✅ Validación de requests sin usuario

### 6. Controlador de Autenticación (`auth.controller.spec.ts`)
- ✅ Login exitoso
- ✅ Registro de usuarios
- ✅ Obtención de perfil de usuario
- ✅ Manejo de datos con valores por defecto

### 7. Validación de DTOs (`auth.dto.spec.ts`)
- ✅ Validación de LoginDto
- ✅ Validación de RegisterDto
- ✅ Validación de campos requeridos
- ✅ Validación de formatos (email, longitud)
- ✅ Validación de roles válidos

### 8. Módulo de Autenticación (`auth.module.spec.ts`)
- ✅ Configuración correcta del módulo
- ✅ Inyección de dependencias
- ✅ Configuración de JWT y Passport
- ✅ Disponibilidad de todos los providers

## Configuración de Jest

### `jest.config.js`
```javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapping: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/../test/setup.ts'],
};
```

## Mocks y Stubs

### 1. Mock de bcrypt
```typescript
jest.mock('bcrypt');
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
```

### 2. Mock de PrismaClient
```typescript
jest.mock('@prisma/client');
```

### 3. Mock de JwtService
```typescript
const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};
```

### 4. Mock de UserRepository
```typescript
const mockUserRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findByUsername: jest.fn(),
  findByEmail: jest.fn(),
  findByDoctorId: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
```

## Casos de Prueba Específicos

### Autenticación Exitosa
```typescript
it('should return login response with token when credentials are valid', async () => {
  userRepository.findByUsername.mockResolvedValue(mockUser);
  mockBcrypt.compare.mockResolvedValue(true as any);
  jwtService.sign.mockReturnValue(mockToken);

  const result = await service.login('testuser', 'password');

  expect(result).toEqual({
    access_token: mockToken,
    user: {
      userId: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: UserRole.DOCTOR,
    },
  });
});
```

### Validación de Roles
```typescript
it('should return true when user has required role', () => {
  reflector.getAllAndOverride.mockReturnValue([UserRole.DOCTOR, UserRole.ADMIN]);

  const result = guard.canActivate(mockExecutionContext);

  expect(result).toBe(true);
});
```

### Validación de DTOs
```typescript
it('should fail validation when email is invalid', async () => {
  const registerDto = new RegisterDto();
  registerDto.username = 'newuser';
  registerDto.email = 'invalid-email';
  registerDto.password = 'password123';
  registerDto.role = UserRole.DOCTOR;

  const errors = await validate(registerDto);

  expect(errors).toHaveLength(1);
  expect(errors[0].property).toBe('email');
  expect(errors[0].constraints).toHaveProperty('isEmail');
});
```

## Mejores Prácticas Implementadas

### 1. Organización de Tests
- Tests agrupados por funcionalidad
- Descripción clara de cada test case
- Setup y teardown apropiados

### 2. Mocks y Stubs
- Mocks de dependencias externas
- Stubs para servicios complejos
- Aislamiento de unidades bajo prueba

### 3. Validación de Comportamiento
- Verificación de llamadas a métodos
- Validación de parámetros pasados
- Comprobación de valores de retorno

### 4. Manejo de Errores
- Tests para casos de error
- Validación de excepciones lanzadas
- Verificación de mensajes de error

### 5. Cobertura Completa
- Tests para casos positivos y negativos
- Validación de edge cases
- Cobertura de todos los métodos públicos

## Ejecución de Pruebas Específicas

### Ejecutar pruebas de un archivo específico
```bash
npm test -- auth.service.spec.ts
```

### Ejecutar pruebas con patrón específico
```bash
npm test -- --testNamePattern="should return login response"
```

### Ejecutar pruebas con verbose output
```bash
npm test -- --verbose
```

## Reportes de Cobertura

Después de ejecutar `npm run test:cov`, se genera un reporte de cobertura en la carpeta `coverage/` que incluye:

- **Cobertura de líneas**: Porcentaje de líneas ejecutadas
- **Cobertura de funciones**: Porcentaje de funciones llamadas
- **Cobertura de ramas**: Porcentaje de ramas de código ejecutadas
- **Cobertura de statements**: Porcentaje de statements ejecutados

## Integración Continua

Las pruebas están configuradas para ejecutarse automáticamente en:

1. **Pre-commit hooks** (recomendado)
2. **CI/CD pipelines**
3. **Pull request validation**

## Próximos Pasos

### Pruebas de Integración
- Tests end-to-end con base de datos real
- Tests de API con supertest
- Tests de integración con servicios externos

### Pruebas de Rendimiento
- Tests de carga con múltiples usuarios
- Tests de concurrencia
- Tests de timeout y rate limiting

### Pruebas de Seguridad
- Tests de inyección de SQL
- Tests de validación de tokens
- Tests de autorización de roles 