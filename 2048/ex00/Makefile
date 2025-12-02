. PHONY: help build up down restart rebuild logs clean dev prod

# Variables
COMPOSE_FILE=docker-compose.yml
SERVICE_NAME=web

# Colores para output
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
NC=\033[0m # No Color

##@ Ayuda

help: ## Muestra esta ayuda
	@echo "$(GREEN)Comandos disponibles:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

##@ Docker - Comandos básicos

build: ## Construye las imágenes Docker
	@echo "$(GREEN)🔨 Construyendo imágenes... $(NC)"
	docker-compose -f $(COMPOSE_FILE) build

up: ## Levanta los contenedores
	@echo "$(GREEN)🚀 Levantando contenedores...$(NC)"
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Contenedores levantados$(NC)"
	@echo "$(YELLOW)🌐 Accede a: http://localhost:8080$(NC)"

down: ## Detiene y elimina los contenedores
	@echo "$(YELLOW)🛑 Deteniendo contenedores...$(NC)"
	docker-compose -f $(COMPOSE_FILE) down
	@echo "$(GREEN)✅ Contenedores detenidos$(NC)"

restart: ## Reinicia los contenedores (down + up)
	@echo "$(YELLOW)🔄 Reiniciando contenedores... $(NC)"
	@$(MAKE) down
	@$(MAKE) up

##@ Docker - Desarrollo

rebuild: ## Reconstruye TODO desde cero (sin caché)
	@echo "$(RED)🔥 Reconstruyendo TODO sin caché...$(NC)"
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	@echo "$(GREEN)✅ Reconstrucción completa$(NC)"
	@echo "$(YELLOW)🌐 Accede a: http://localhost:8080$(NC)"

dev: rebuild ## Alias para rebuild (modo desarrollo)

reload: ## Recarga rápida (down + build + up)
	@echo "$(YELLOW)⚡ Recarga rápida...$(NC)"
	@$(MAKE) down
	@$(MAKE) build
	@$(MAKE) up

##@ Docker - Información y logs

logs: ## Muestra los logs de los contenedores
	docker-compose logs -f

logs-tail: ## Muestra las últimas 50 líneas de logs
	docker-compose logs --tail=50 -f

ps: ## Lista los contenedores en ejecución
	@echo "$(GREEN)📋 Contenedores activos:$(NC)"
	docker-compose ps

status: ## Muestra el estado de los contenedores
	@echo "$(GREEN)📊 Estado de los contenedores:$(NC)"
	@docker-compose ps
	@echo ""
	@echo "$(GREEN)💾 Espacio usado por Docker:$(NC)"
	@docker system df

##@ Docker - Limpieza

clean: ## Elimina contenedores, redes y volúmenes
	@echo "$(RED)🧹 Limpiando...$(NC)"
	docker-compose down -v
	@echo "$(GREEN)✅ Limpieza completada$(NC)"

clean-all: ## Limpieza profunda (incluye imágenes y caché)
	@echo "$(RED)🔥 Limpieza PROFUNDA...$(NC)"
	docker-compose down -v --rmi all
	docker system prune -af
	@echo "$(GREEN)✅ Limpieza profunda completada$(NC)"

##@ Docker - Acceso

shell: ## Abre una shell dentro del contenedor
	@echo "$(GREEN)🐚 Abriendo shell en el contenedor...$(NC)"
	docker-compose exec $(SERVICE_NAME) sh

exec: ## Ejecuta un comando en el contenedor (uso: make exec CMD="ls -la")
	docker-compose exec $(SERVICE_NAME) $(CMD)

##@ Desarrollo - Utilidades

watch: ## Observa cambios y recarga automáticamente
	@echo "$(YELLOW)👁️  Modo watch activado (Ctrl+C para salir)$(NC)"
	@while true; do \
		inotifywait -r -e modify,create,delete . 2>/dev/null || \
		echo "Presiona Enter para recargar..."; \
		read -t 5; \
		clear; \
		$(MAKE) reload; \
	done

browser: ## Abre el navegador en localhost:8080
	@echo "$(GREEN)🌐 Abriendo navegador... $(NC)"
	@command -v xdg-open > /dev/null && xdg-open http://localhost:8080 || \
	 command -v open > /dev/null && open http://localhost:8080 || \
	 echo "$(YELLOW)⚠️  Abre manualmente: http://localhost:8080$(NC)"

##@ Testing

test-board: ## Carga un tablero de prueba (derrota)
	@echo "$(YELLOW)🧪 Instrucciones para probar lose condition:$(NC)"
	@echo "1. Abre la consola del navegador (F12)"
	@echo "2. Pega este código:"
	@echo "$(GREEN)board = [[2,4,2,4],[4,2,4,2],[2,4,2,4],[4,2,4,2]]; renderBoard();$(NC)"
	@echo "3. Presiona una flecha para probar Game Over"

##@ Información del proyecto

info: ## Muestra información del proyecto
	@echo "$(GREEN)📦 Información del Proyecto$(NC)"
	@echo "  Proyecto: 2048 Game"
	@echo "  Puerto: 8080"
	@echo "  URL: http://localhost:8080"
	@echo ""
	@echo "$(GREEN)📂 Estructura:$(NC)"
	@ls -lh index.html script.js styles.css Dockerfile docker-compose.yml 2>/dev/null || echo "  Archivos principales detectados"

version: ## Muestra versiones de Docker
	@echo "$(GREEN)🐳 Versiones:$(NC)"
	@docker --version
	@docker-compose --version

##@ Shortcuts (atajos rápidos)

start: up ## Alias para 'up'

stop: down ## Alias para 'down'

r: restart ## Atajo para restart

rb: rebuild ## Atajo para rebuild

l: logs ## Atajo para logs