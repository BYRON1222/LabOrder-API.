# Architecture (MVP)

## Vista general

El servicio expone una API REST con Express. Para mantener el MVP operativo sin dependencias externas, las órdenes se guardan en memoria (array local).

## Diagrama (Mermaid)

```mermaid
flowchart TB
  Client[Cliente / Frontend / Postman] -->|HTTP| API[Express API]
  API --> OrdersRepo[Orders Repository (Array en memoria)]
  OrdersRepo --> OrdersStore[(orders: [] / nextId)]

  API -->|respuestas JSON| Client
```

## Componentes

- **Express API (`index.js`)**: define rutas y validaciones básicas.
- **Orders Repository (en memoria)**: mantiene `orders` y `nextId`.

## Consideraciones del MVP

- No hay persistencia: al reiniciar el servidor se pierden las órdenes.
- No hay concurrencia avanzada ni bloqueo: para un demo es suficiente.

