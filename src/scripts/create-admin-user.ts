import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Verificar si ya existe un usuario admin
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('Ya existe un usuario administrador');
      return;
    }

    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@hospital.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

    console.log('Usuario administrador creado exitosamente:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@hospital.com');
    console.log('Role: ADMIN');
    console.log('ID:', adminUser.userId);

  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 