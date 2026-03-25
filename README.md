# LabOrder-API (MVP)

API REST en Node.js/Express para un **Sistema de Órdenes de Laboratorio**.

Este MVP funciona con un **array en memoria** (sin base de datos) para evitar errores de conexión durante demos/grabaciones.

## Endpoints

- `POST /orders`: Crear orden (`cliente`, `prueba`, `cantidad`)
- `GET /orders`: Listar todas las órdenes
- `GET /orders/:id`: Ver una orden específica
- `PUT /orders/:id`: Cambiar el estado a `Completado`

## Manejo de errores

- `400 Bad Request`: campos vacíos/no válidos o `id` inválido
- `404 Not Found`: orden no encontrada o ruta no encontrada

## Requisitos

- Node.js (con npm)

## Instalación y ejecución

En la carpeta del proyecto:

1. `npm install`
2. `node index.js`
3. La API queda disponible en: `http://localhost:3000`

## Ejemplos

Crear orden:

```bash
curl -X POST http://localhost:3000/orders ^
  -H "Content-Type: application/json" ^
  -d "{\"cliente\":\"Juan\",\"prueba\":\"Sangre\",\"cantidad\":3}"
```

Listar órdenes:

```bash
curl http://localhost:3000/orders
```

Actualizar estado:

```bash
curl -X PUT http://localhost:3000/orders/1
```

## Notas del MVP

- Las órdenes **se pierden al reiniciar** el servidor (porque el almacenamiento es local en memoria).
- Existe un `.env`, pero en este MVP sin BD no se usa para persistencia.

