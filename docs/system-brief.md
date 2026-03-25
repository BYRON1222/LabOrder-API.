# System Brief (MVP)

## Objetivo

Construir un MVP de API REST para gestionar **Órdenes de Laboratorio**.

El MVP permite:
- Crear una orden con `Cliente`, `Prueba` y `Cantidad`.
- Listar todas las órdenes.
- Consultar una orden por `Id`.
- Actualizar el estado de una orden a `Completado`.

## Alcance del MVP

- API: Node.js + Express.
- Persistencia: **memoria local** usando un array.
- Integración con SQL Server: **no incluida en este MVP** (para evitar fallos de conexión en demos).

## Modelo de datos

Una orden tiene la siguiente estructura:
- `Id` (number): generado incrementalmente por el servidor.
- `Cliente` (string): nombre o identificador del cliente.
- `Prueba` (string): tipo de prueba solicitada.
- `Cantidad` (number): entero mayor a 0.
- `Estado` (string): inicial `Pendiente`, luego `Completado`.

## Reglas de validación (básicas)

Para `POST /orders`:
- `cliente`, `prueba` y `cantidad` no deben venir vacíos.
- `cantidad` debe ser un entero mayor a 0.

Para `GET/PUT /orders/:id`:
- `id` debe ser entero mayor a 0.

## Manejo de errores

- `400 Bad Request`: datos inválidos (por ejemplo, vacíos o `id` no válido).
- `404 Not Found`: orden no encontrada (o ruta inexistente).

