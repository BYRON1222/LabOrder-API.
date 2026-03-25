# Requerimientos e historias de usuario — LabOrder-API (MVP)

Este documento recoge los requerimientos funcionales y no funcionales acordados para el MVP del **Sistema de Órdenes de Laboratorio**, junto con las historias de usuario y criterios de aceptación asociados.

---

## 1. Contexto y objetivo

Se necesita una **API REST en Node.js** que permita registrar y consultar órdenes de laboratorio de forma sencilla, apta para entrega académica y demostración (video / clase). El MVP prioriza **estabilidad y claridad** sobre persistencia en base de datos.

---

## 2. Requerimientos funcionales

| ID | Requerimiento |
|----|----------------|
| RF-01 | La API debe exponer **cuatro endpoints** sobre el recurso órdenes: listar todas, obtener por id, crear y actualizar estado. |
| RF-02 | **POST** debe crear una orden con los campos **Cliente**, **Prueba** y **Cantidad**. El servidor asigna un **Id** único incremental y un **Estado** inicial coherente (p. ej. `Pendiente`). |
| RF-03 | **GET** de todas las órdenes debe devolver la colección completa en formato JSON. |
| RF-04 | **GET** por **id** debe devolver una única orden cuando exista. |
| RF-05 | **PUT** por **id** debe cambiar el **Estado** de la orden a **`Completado`** cuando la orden exista. |
| RF-06 | Debe validarse que **no se envíen datos vacíos** en la creación: `cliente`, `prueba` y `cantidad` obligatorios y con reglas básicas de formato (p. ej. `cantidad` entero > 0). |
| RF-07 | El **id** en rutas con parámetro debe validarse (entero > 0); si no cumple, responder con error apropiado. |
| RF-08 | Cuando una orden o ruta no exista según las reglas del API, debe responder **404**. Cuando los datos de entrada sean inválidos, debe responder **400**. |
| RF-09 | Para el MVP acordado, los datos se almacenan en **memoria (array local)** para que el servicio funcione sin depender de SQL Server u otra BD en la demo. |

### 2.1 Contrato de endpoints (resumen)

| Método | Ruta | Comportamiento esperado |
|--------|------|-------------------------|
| `GET` | `/orders` | Lista todas las órdenes. |
| `GET` | `/orders/:id` | Detalle de una orden por `id`. |
| `POST` | `/orders` | Crea orden (`cliente`, `prueba`, `cantidad`). |
| `PUT` | `/orders/:id` | Actualiza estado a `Completado`. |

---

## 3. Requerimientos no funcionales

| ID | Requerimiento |
|----|----------------|
| RNF-01 | Implementación con **Express** y código **legible y comentado** donde aporte valor a la entrega académica. |
| RNF-02 | Respuestas en **JSON** coherentes (órdenes y mensajes de error). |
| RNF-03 | Documentación del sistema: **README**, brief del sistema, arquitectura (incl. diagrama) y **contrato OpenAPI** alineados con el comportamiento real del API. |
| RNF-04 | El MVP en memoria implica que los datos **no persisten** al reiniciar el proceso; esto es aceptable para el alcance acordado. |

---

## 4. Historias de usuario

### HU-01 — Registrar una orden de laboratorio

**Como** usuario del sistema (o integrador del front)  
**Quiero** registrar una orden con cliente, prueba y cantidad  
**Para** dejar constancia de lo solicitado al laboratorio.

**Criterios de aceptación**

- Dado un cuerpo JSON válido con `cliente`, `prueba` y `cantidad`, cuando envío **POST** a `/orders`, entonces recibo **201** y el cuerpo incluye `Id`, los campos enviados y `Estado` inicial.
- Si falta algún campo, viene vacío (solo espacios) o `cantidad` no es un entero > 0, entonces recibo **400** con un mensaje de error claro.
- No se exige usuario/contraseña de SQL ni conexión a BD para que la operación sea exitosa en el MVP en memoria.

---

### HU-02 — Ver todas las órdenes

**Como** usuario o demostrador  
**Quiero** listar todas las órdenes registradas  
**Para** revisar el estado general del sistema.

**Criterios de aceptación**

- Cuando envío **GET** a `/orders`, recibo **200** y un arreglo JSON (puede estar vacío si no hay órdenes).

---

### HU-03 — Consultar una orden por identificador

**Como** usuario  
**Quiero** ver el detalle de una orden por su `Id`  
**Para** confirmar datos y estado.

**Criterios de aceptación**

- Dado un `id` existente, **GET** `/orders/:id` devuelve **200** y la orden.
- Dado un `id` inexistente, devuelve **404** con mensaje indicando que la orden no fue encontrada.
- Dado un `id` no numérico o ≤ 0, devuelve **400**.

---

### HU-04 — Marcar una orden como completada

**Como** personal del laboratorio (rol conceptual)  
**Quiero** actualizar el estado de una orden a **Completado**  
**Para** reflejar que la prueba ya fue procesada.

**Criterios de aceptación**

- Dado un `id` existente, **PUT** `/orders/:id` devuelve **200** y la orden con `Estado` igual a `Completado`.
- Dado un `id` inexistente, devuelve **404`.
- Dado un `id` inválido, devuelve **400**.

---

### HU-05 — Manejo de errores y rutas desconocidas

**Como** desarrollador consumidor del API  
**Quiero** respuestas de error consistentes  
**Para** integrar o depurar sin ambigüedad.

**Criterios de aceptación**

- Entradas inválidas en creación o parámetros de ruta inválidos → **400** con cuerpo JSON `{ "error": "..." }` (y `details` si aplica).
- Recurso no encontrado u orden inexistente → **404** con mensaje explícito.
- Ruta no definida del API → **404** (comportamiento acordado para el MVP).

---

## 5. Fuera de alcance (MVP actual)

- Persistencia en **SQL Server** u otra base de datos (quedó explícitamente fuera para demos estables; puede retomarse en una siguiente iteración).
- Autenticación, autorización por roles y auditoría.
- Paginación, filtros avanzados y búsqueda.

---

## 6. Trazabilidad con artefactos del proyecto

| Artefacto | Ubicación |
|-----------|-----------|
| Implementación | `index.js` |
| Contrato API | `docs/api/openapi.json` |
| Resumen del sistema | `docs/system-brief.md` |
| Arquitectura | `docs/architecture.md` |
| Uso rápido | `README.md` |
