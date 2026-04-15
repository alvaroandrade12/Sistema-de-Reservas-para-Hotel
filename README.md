# 🎓 Sistema de Gestión Académica

> Proyecto full-stack guiado por el docente — Programación Avanzada 2026A

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](http://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Modelo de Datos](#-modelo-de-datos)
- [Plan de Releases](#-plan-de-releases)
- [Sprints e Historias de Usuario](#-sprints-e-historias-de-usuario)
- [Cronograma](#-cronograma)
- [Definition of Done (DoD)](#-definition-of-done-dod)
- [Tablero Kanban](#-tablero-kanban)
- [Instalación y Ejecución](#-instalación-y-ejecución)

---

## 📖 Descripción del Proyecto

El Sistema de Gestión Hotelera es una aplicación web full-stack que permite administrar la operación de un hotel boutique, incluyendo la gestión de huéspedes, habitaciones, reservas y servicios adicionales como spa, restaurante y lavandería. El sistema facilita procesos clave como el registro de clientes, control de disponibilidad, check-in y check-out, así como la facturación de servicios, optimizando la organización y evitando errores como el overbooking.

## 🧰 Pila Tecnológica

Frontend: React (Next.js)
Backend: NestJS
Base de datos: PostgreSQL
ORM: Prisma
Contenedores: Docker

## 🏗️ Arquitectura

El sistema sigue una arquitectura cliente-servidor:

Frontend: Interfaz de usuario para la gestión del sistema
Backend: API REST desarrollada en NestJS
Base de datos: PostgreSQL gestionada mediante Prisma

Se implementa una arquitectura modular separando las funcionalidades en:

Huéspedes
Habitaciones
Reservas
Servicios

## 🧠 Modelo de Datos

El sistema se basa en un modelo relacional con las siguientes entidades:

Huésped: Información del cliente
Habitación: Tipos, precios y estado
Reserva: Relación entre huésped y habitación
Servicio: Consumos adicionales

Relaciones principales:

Un huésped puede tener múltiples reservas
Una habitación puede tener múltiples reservas
Una reserva puede tener múltiples servicios

## 🚀 Plan de Lanzamientos (Releases)

🔹 Release 1: Base del sistema
Gestión de huéspedes
Gestión de habitaciones
Creación de reservas
Validación de disponibilidad
🔹 Release 2: Funcionalidades avanzadas
Servicios adicionales
Facturación
Reportes
Dashboard

## 🧩 Sprints e Historias de Usuario

El desarrollo se organizó en sprints bajo metodología ágil (Scrum):

Sprint 1: Configuración del entorno
Sprint 2: CRUD de huéspedes y habitaciones
Sprint 3: Gestión de reservas
Sprint 4: Servicios y facturación
Sprint 5: Reportes y dashboard
Sprint 6: Pruebas y despliegue

## 📅 Cronograma

El proyecto se desarrolló en un periodo de aproximadamente 6 semanas, distribuidas en sprints semanales con entregables incrementales.

## ✅ Definición de Hecho (DoD)
Backend
Endpoints funcionales
Validaciones implementadas
Lógica de negocio correcta
Frontend
Interfaz funcional
Consumo de API
Manejo de errores
Infraestructura y Código
Docker configurado
Proyecto modular
Código limpio y versionado

## 📌 Tablero Kanban

El seguimiento del proyecto se realizó mediante un tablero Kanban con las siguientes columnas:

Pendiente
En progreso
En revisión
Completado

## ⚙️ Instalación y Ejecución
🔹 Requisitos
Docker
Node.js
🔹 Ejecución
docker-compose up
🔹 Acceso
Backend: http://localhost:3000
Frontend: abrir frontend/index.html
