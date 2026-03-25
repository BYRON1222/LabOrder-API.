# Architecture (MVP)

## Vista general

El servicio expone una API REST con Express. Para mantener el MVP operativo sin dependencias externas, las órdenes se guardan en memoria (array local).


```mermaid
flowchart LR
    Cliente["Cliente o Postman"]
    API["Express API"]
    Memoria["Array orders en memoria"]

    Cliente -->|HTTP| API
    API -->|leer y escribir| Memoria
    Memoria -->|orden actual| API
    API -->|JSON| Cliente
```

## Componentes

- **Express API (`index.js`)**: define rutas y validaciones básicas.
- **Orders Repository (en memoria)**: mantiene `orders` y `nextId`.

## Consideraciones del MVP

- No hay persistencia: al reiniciar el servidor se pierden las órdenes.
- No hay concurrencia avanzada ni bloqueo: para un demo es suficiente.

