# Script para desarrollo con Docker (PowerShell)
# Uso: .\scripts\docker-dev.ps1 [comando]

param(
    [Parameter(Position=0)]
    [string]$Command
)

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

switch ($Command) {
    "start" {
        Write-Info "Iniciando entorno de desarrollo..."
        docker-compose up -d
        Write-Success "Entorno iniciado!"
        Write-Host "📊 API: http://localhost:3000" -ForegroundColor Yellow
        Write-Host "🗄️  phpMyAdmin: http://localhost:8080" -ForegroundColor Yellow
        Write-Host "📚 Documentación: http://localhost:3000/api-docs" -ForegroundColor Yellow
    }
    "stop" {
        Write-Info "Deteniendo entorno de desarrollo..."
        docker-compose down
        Write-Success "Entorno detenido!"
    }
    "restart" {
        Write-Info "Reiniciando entorno de desarrollo..."
        docker-compose down
        docker-compose up -d
        Write-Success "Entorno reiniciado!"
    }
    "logs" {
        Write-Info "Mostrando logs..."
        docker-compose logs -f
    }
    "build" {
        Write-Info "Construyendo imágenes..."
        docker-compose build
        Write-Success "Imágenes construidas!"
    }
    "clean" {
        Write-Info "Limpiando contenedores y volúmenes..."
        docker-compose down -v
        docker system prune -f
        Write-Success "Limpieza completada!"
    }
    "db-reset" {
        Write-Info "Reseteando base de datos..."
        docker-compose exec api npx prisma migrate reset --force
        Write-Success "Base de datos reseteada!"
    }
    "db-migrate" {
        Write-Info "Ejecutando migraciones..."
        docker-compose exec api npx prisma migrate deploy
        Write-Success "Migraciones ejecutadas!"
    }
    "shell" {
        Write-Info "Abriendo shell en el contenedor..."
        docker-compose exec api sh
    }
    default {
        Write-Error "Comando no válido: $Command"
        Write-Host ""
        Write-Host "Uso: .\scripts\docker-dev.ps1 {comando}" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Comandos disponibles:" -ForegroundColor White
        Write-Host "  start      - Iniciar entorno de desarrollo" -ForegroundColor Gray
        Write-Host "  stop       - Detener entorno de desarrollo" -ForegroundColor Gray
        Write-Host "  restart    - Reiniciar entorno de desarrollo" -ForegroundColor Gray
        Write-Host "  logs       - Mostrar logs en tiempo real" -ForegroundColor Gray
        Write-Host "  build      - Construir imágenes Docker" -ForegroundColor Gray
        Write-Host "  clean      - Limpiar contenedores y volúmenes" -ForegroundColor Gray
        Write-Host "  db-reset   - Resetear base de datos" -ForegroundColor Gray
        Write-Host "  db-migrate - Ejecutar migraciones" -ForegroundColor Gray
        Write-Host "  shell      - Abrir shell en el contenedor" -ForegroundColor Gray
        exit 1
    }
} 