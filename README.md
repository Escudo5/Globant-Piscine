# 🎮 2048 Game

![2048 Game Banner](https://img.shields.io/badge/Game-2048-orange?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

Una implementación moderna y elegante del clásico juego **2048**, desarrollado con tecnologías web puras y containerizado con Docker.

---

## 📋 Tabla de Contenidos

- [🎯 Sobre el Proyecto](#-sobre-el-proyecto)
- [✨ Características](#-características)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [🎮 Cómo Jugar](#-cómo-jugar)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Desarrollo](#-desarrollo)
- [🐳 Docker](#-docker)
- [📝 Makefile](#-makefile)
- [🎨 Características Técnicas](#-características-técnicas)
- [📸 Screenshots](#-screenshots)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)

---

## 🎯 Sobre el Proyecto

**2048** es un juego de puzzle numérico adictivo donde el objetivo es combinar fichas con el mismo número para crear una ficha con el valor **2048**. 

Este proyecto es una implementación desde cero utilizando **HTML5**, **CSS3** y **JavaScript vanilla** (sin frameworks), containerizado con **Docker** para facilitar el despliegue y desarrollo.

### Objetivos del Proyecto

- ✅ Crear una versión funcional y visualmente atractiva del juego 2048
- ✅ Utilizar únicamente tecnologías web nativas (sin librerías externas)
- ✅ Implementar animaciones suaves y efectos visuales
- ✅ Containerizar la aplicación con Docker
- ✅ Automatizar tareas de desarrollo con Makefile

---

## ✨ Características

### Funcionalidades del Juego

- 🎯 **Mecánica de juego completa**: Movimiento en 4 direcciones con fusión de fichas
- 🏆 **Sistema de puntuación**: Acumula puntos al fusionar fichas
- 🎨 **Animaciones fluidas**:
  - Aparición de fichas nuevas con rotación
  - Efecto de fusión al combinar fichas
  - Shake cuando no hay movimientos válidos
  - Efectos de brillo en fichas de alto valor
  - Efecto arcoíris en la ficha 2048
- 🎭 **Overlays elegantes**: Game Over y Victoria con animaciones
- 🔄 **Botón de reinicio**: Reinicia el juego en cualquier momento
- 📱 **Diseño responsive**: Adaptable a diferentes tamaños de pantalla

### Características Técnicas

- ⚡ **Sin dependencias**: JavaScript vanilla puro
- 🐳 **Dockerizado**: Fácil despliegue con contenedores
- 🔧 **Makefile**: Comandos automatizados para desarrollo
- 🚫 **Sin caché**: Configuración de Nginx optimizada para desarrollo
- 🎨 **CSS Animations**: Animaciones CSS nativas sin librerías
- 📦 **Hot Reload**: Cambios en el código sin necesidad de reconstruir (opcional)

---

## 🛠️ Tecnologías Utilizadas

### Frontend

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | - | Estructura del DOM |
| **CSS3** | - | Estilos y animaciones |
| **JavaScript** | ES6+ | Lógica del juego |

### Backend/Infraestructura

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Nginx** | Alpine | Servidor web estático |
| **Docker** | 20.10+ | Containerización |
| **Docker Compose** | 3.8 | Orquestación de contenedores |

### Herramientas de Desarrollo

- **Make**: Automatización de tareas
- **Git**: Control de versiones

---

## 🚀 Instalación y Uso

### Prerequisitos

- [Docker](https://www.docker.com/get-started) (20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (3.8 o superior)
- Make (opcional, pero recomendado)

### Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/Escudo5/Globant-Piscine.git
cd 2048/ex00

# 2. Levantar el proyecto con Docker
make rebuild

# O sin Make:
docker-compose build --no-cache
docker-compose up -d

# 3.  Abrir en el navegador
http://localhost:8080
