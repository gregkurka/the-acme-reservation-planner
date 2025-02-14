require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchRestaurants,
  fetchCustomers,
  createReservation,
  destroyReservation,
  fetchReservations,
} = require("./db.js");

app.use(express.json());

//fetch routes
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await fetchRestaurants();
    res.send(restaurants);
  } catch (err) {
    next(err);
  }
});

app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
    res.send(customers);
  } catch (err) {
    next(err);
  }
});

app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await fetchReservations();
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

//POST routes
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const { restaurantId, partyCount, reservationDate } = req.body;
    const customerId = req.params.id;

    const created = await createReservation({
      customerId,
      restaurantId,
      partyCount,
      reservationDate,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

app.post("/api/customers", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Customer name is required" });
    }

    const createdCustomer = await createCustomer(name);
    res.status(201).json(createdCustomer);
  } catch (err) {
    next(err);
  }
});

app.post("/api/restaurants", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Restaurant name is required" });
    }

    const createdRestaurant = await createRestaurant(name);
    res.status(201).json(createdRestaurant);
  } catch (err) {
    next(err);
  }
});

//DELETE route
app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      const { customer_id, id } = req.params;

      const success = await destroyReservation(id, customer_id);

      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

const init = async () => {
  await client.connect();
  app.listen(PORT, () => {
    console.log(`Server alive on port ${PORT}`);
  });
};

init();
