# Architecture (MVP)

## Vista general

El servicio expone una API REST con Express. Para mantener el MVP operativo sin dependencias externas, las órdenes se guardan en memoria (array local).

## Diagrama (Mermaid)

graph TD
    A[Cliente/Navegador] -->|Petición HTTP| B[API Express]
    B -->|Consulta/Escribe| C["Repositorio (Array en memoria)"]
    C -->|Retorna Datos| B
    B -->|Respuesta JSON| A

## Componentes

- **Express API (`index.js`)**: define rutas y validaciones básicas.
- **Orders Repository (en memoria)**: mantiene `orders` y `nextId`.

## Consideraciones del MVP

- No hay persistencia: al reiniciar el servidor se pierden las órdenes.
- No hay concurrencia avanzada ni bloqueo: para un demo es suficiente.

