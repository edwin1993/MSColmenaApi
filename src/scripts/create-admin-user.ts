import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('🔐 Creando usuario administrador...');

    // Verificar si ya existe un usuario admin
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('⚠️  Ya existe un usuario administrador en el sistema.');
      console.log(`   Usuario: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      return;
    }

    // Datos del usuario administrador
    const adminData = {
      username: 'admin',
      email: 'admin@mscolmena.com',
      password: 'admin123',
      role: 'ADMIN' as const,
      isActive: true
    };

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Crear usuario en la base de datos
    const adminUser = await prisma.user.create({
      data: {
        username: adminData.username,
        email: adminData.email,
        password: hashedPassword,
        role: adminData.role,
        isActive: adminData.isActive
      }
    });

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('');
    console.log('📋 Credenciales de acceso:');
    console.log(`   Usuario: ${adminData.username}`);
    console.log(`   Contraseña: ${adminData.password}`);
    console.log(`   Email: ${adminData.email}`);
    console.log('');
    console.log('🔗 Puedes acceder a:');
    console.log('   - API: http://localhost:3000');
    console.log('   - Documentación: http://localhost:3000/api-docs');
    console.log('   - phpMyAdmin: http://localhost:8080');

  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el script
createAdminUser(); 