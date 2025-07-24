#!/bin/bash

# Script para desarrollo con Docker
# Uso: ./scripts/docker-dev.sh [comando]

set -e

case "$1" in
  "start")
    echo "🚀 Iniciando entorno de desarrollo..."
    docker-compose up -d
    echo "✅ Entorno iniciado!"
    echo "📊 API: http://localhost:3000"
    echo "🗄️  phpMyAdmin: http://localhost:8080"
    echo "📚 Documentación: http://localhost:3000/api-docs"
    ;;
  "stop")
    echo "🛑 Deteniendo entorno de desarrollo..."
    docker-compose down
    echo "✅ Entorno detenido!"
    ;;
  "restart")
    echo "🔄 Reiniciando entorno de desarrollo..."
    docker-compose down
    docker-compose up -d
    echo "✅ Entorno reiniciado!"
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    docker-compose logs -f
    ;;
  "build")
    echo "🔨 Construyendo imágenes..."
    docker-compose build
    echo "✅ Imágenes construidas!"
    ;;
  "clean")
    echo "🧹 Limpiando contenedores y volúmenes..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Limpieza completada!"
    ;;
  "db-reset")
    echo "🗄️  Reseteando base de datos..."
    docker-compose exec api npx prisma migrate reset --force
    echo "✅ Base de datos reseteada!"
    ;;
  "db-migrate")
    echo "🔄 Ejecutando migraciones..."
    docker-compose exec api npx prisma migrate deploy
    echo "✅ Migraciones ejecutadas!"
    ;;
  "shell")
    echo "🐚 Abriendo shell en el contenedor..."
    docker-compose exec api sh
    ;;
  *)
    echo "❓ Uso: $0 {start|stop|restart|logs|build|clean|db-reset|db-migrate|shell}"
    echo ""
    echo "Comandos disponibles:"
    echo "  start      - Iniciar entorno de desarrollo"
    echo "  stop       - Detener entorno de desarrollo"
    echo "  restart    - Reiniciar entorno de desarrollo"
    echo "  logs       - Mostrar logs en tiempo real"
    echo "  build      - Construir imágenes Docker"
    echo "  clean      - Limpiar contenedores y volúmenes"
    echo "  db-reset   - Resetear base de datos"
    echo "  db-migrate - Ejecutar migraciones"
    echo "  shell      - Abrir shell en el contenedor"
    exit 1
    ;;
esac 