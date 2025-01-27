//framework node.js for apis
const express = require('express');
const app = express();
const port = 3000;

//Middleware for JSON process
app.use(express.json());

// Example data
const items = {
  sandwiches: [
    { id: 1, name: 'X Burger', price: 5.0 },
    { id: 2, name: 'X Egg', price: 4.5 },
    { id: 3, name: 'X Bacon', price: 7.0 },
  ],
  extras: [
    { id: 1, name: 'Fries', price: 2.0 },
    { id: 2, name: 'Soft drink', price: 2.5 },
  ],
};

//Array for save orders
const orders = [];


// Endpoints API

// List all items
app.get('/items', (req, res) => {
  res.json(items);
});

// List sandwiches only
app.get('/items/sandwiches', (req, res) => {
  res.json(items.sandwiches);
});

// List extras only
app.get('/items/extras', (req, res) => {
  res.json(items.extras);
});

// Create an order
app.post('/orders', (req, res) => {
    const { sandwichId, extras } = req.body;

    // Validate required fields
    if (!sandwichId || !extras) {
        return res.status(409).json({ error: 'Missing sandwichId or extras in request data' });
    }

    const sandwich = items.sandwiches.find((s) => s.id === sandwichId);

    if (!sandwich) {
        return res.status(400).json({ error: 'Invalid sandwich ID' });
    }

    const selectedExtras = (extras || []).map((extraId) =>
        items.extras.find((e) => e.id === extraId)
    );

    if (selectedExtras.includes(undefined)) {
        return res.status(400).json({ error: 'Invalid extra ID' });
    }

    // Check for duplicates
    if (new Set(extras).size !== extras.length) {
        return res.status(400).json({ error: 'Duplicate extras are not allowed' });
    }

    // Calculate price
    let totalPrice = sandwich.price;
    selectedExtras.forEach((extra) => (totalPrice += extra.price));

    // Apply discounts
    if (extras.length === 2) {
        totalPrice *= 0.8; // 20% discount
    } else if (extras.includes(2)) {
        totalPrice *= 0.85; // 15% discount for soft drink
    } else if (extras.includes(1)) {
        totalPrice *= 0.9; // 10% discount for fries
    }

    const order = { id: orders.length + 1, sandwich, extras: selectedExtras, totalPrice };
    orders.push(order);
    res.status(201).json(order);
});
  

// List all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Update an order
app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find((o) => o.id === parseInt(id));

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const { sandwichId, extras } = req.body;
  const sandwich = items.sandwiches.find((s) => s.id === sandwichId);

  if (!sandwich) {
    return res.status(400).json({ error: 'Invalid sandwich ID' });
  }

  const selectedExtras = (extras || []).map((extraId) =>
    items.extras.find((e) => e.id === extraId)
  );

  if (selectedExtras.includes(undefined)) {
    return res.status(400).json({ error: 'Invalid extra ID' });
  }

  order.sandwich = sandwich;
  order.extras = selectedExtras;
  order.totalPrice = sandwich.price;
  selectedExtras.forEach((extra) => (order.totalPrice += extra.price));
  res.json(order);
});

// Delete an order
app.delete('/orders/:id', (req, res) => {
  const { id } = req.params;
  const index = orders.findIndex((o) => o.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});