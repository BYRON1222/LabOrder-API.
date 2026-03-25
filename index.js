const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// MVP sin BD: almacenamiento en memoria (para grabar el video sin errores de conexión).
let orders = [];
let nextId = 1;

/**
 * Valida datos requeridos para crear una orden.
 */
function validateOrderFields({ cliente, prueba, cantidad }) {
  if (!cliente || !String(cliente).trim()) {
    return "El campo 'cliente' es obligatorio.";
  }
  if (!prueba || !String(prueba).trim()) {
    return "El campo 'prueba' es obligatorio.";
  }
  if (cantidad === undefined || cantidad === null || String(cantidad).trim() === "") {
    return "El campo 'cantidad' es obligatorio.";
  }
  if (!Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0) {
    return "El campo 'cantidad' debe ser un numero entero mayor a 0.";
  }
  return null;
}

// POST /orders: Crear una nueva orden.
app.post("/orders", async (req, res) => {
  try {
    const { cliente, prueba, cantidad } = req.body;
    const validationError = validateOrderFields({ cliente, prueba, cantidad });

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newOrder = {
      Id: nextId++,
      Cliente: String(cliente).trim(),
      Prueba: String(prueba).trim(),
      Cantidad: Number(cantidad),
      Estado: "Pendiente"
    };

    orders.push(newOrder);
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ error: "Error interno al crear la orden.", details: error.message });
  }
});

// GET /orders: Lista todas las ordenes.
app.get("/orders", async (_req, res) => {
  try {
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Error interno al listar ordenes.", details: error.message });
  }
});

// GET /orders/:id: Devuelve una orden especifica.
app.get("/orders/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "El parametro 'id' debe ser un numero entero mayor a 0." });
    }

    const order = orders.find((o) => o.Id === id);
    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada." });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error interno al obtener la orden.", details: error.message });
  }
});

// PUT /orders/:id: Cambia el estado de la orden a 'Completado'.
app.put("/orders/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "El parametro 'id' debe ser un numero entero mayor a 0." });
    }

    const order = orders.find((o) => o.Id === id);
    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada." });
    }

    order.Estado = "Completado";
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error interno al actualizar la orden.", details: error.message });
  }
});

// Middleware final para rutas no definidas.
app.use((_req, res) => {
  return res.status(404).json({ error: "Ruta no encontrada." });
});

// Manejo de errores de parsing (por ejemplo, JSON inválido).
// (Express ya responde 400 en muchos casos, pero aquí queda explícito para el MVP.)
app.use((err, _req, res, _next) => {
  if (res.headersSent) return;
  return res.status(400).json({ error: "Solicitud inválida.", details: err.message });
});

app.listen(PORT, () => {
  console.log(`API ejecutandose en http://localhost:${PORT}`);
});
