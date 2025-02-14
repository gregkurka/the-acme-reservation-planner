require("dotenv").config();
const pg = require("pg");
const uuid = require("uuid");

const client = new pg.Client();

const createTables = async () => {
  try {
    const SQL = `
    DROP TABLE IF EXISTS reservations;

    DROP TABLE IF EXISTS restaurants;

    DROP TABLE IF EXISTS customers;

    CREATE TABLE
        restaurants (
            id UUID PRIMARY KEY,
            name VARCHAR(128) NOT NULL UNIQUE
        );

    CREATE TABLE
        customers (
            id UUID PRIMARY KEY,
            name VARCHAR(128) NOT NULL UNIQUE
        );

    CREATE TABLE
        reservations (
            id UUID PRIMARY KEY,
            customer_id UUID NOT NULL REFERENCES customers (id),
            restaurant_id UUID NOT NULL REFERENCES restaurants (id),
            party_count INT NOT NULL,
            reservation_date DATE NOT NULL
        );
    `;
    await client.query(SQL);
  } catch (err) {
    console.error(err);
  }
};

const createCustomer = async (customerName) => {
  try {
    const SQL = "INSERT INTO customers(id,name) VALUES($1, $2) RETURNING *;";
    const { rows } = await client.query(SQL, [uuid.v4(), customerName]);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

const createRestaurant = async (restaurantName) => {
  try {
    const SQL = "INSERT INTO restaurants(id,name) VALUES($1, $2) RETURNING *;";
    const { rows } = await client.query(SQL, [uuid.v4(), restaurantName]);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

const fetchRestaurants = async () => {
  try {
    const SQL = "SELECT * FROM restaurants;";
    const { rows } = await client.query(SQL);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

const fetchCustomers = async () => {
  try {
    const SQL = "SELECT * FROM customers;";
    const { rows } = await client.query(SQL);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

const createReservation = async (reservation) => {
  try {
    const { customerId, restaurantId, partyCount, reservationDate } =
      reservation;
    const SQL = `INSERT INTO reservations(id, customer_id, restaurant_id, party_count, reservation_date) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
    const { rows } = await client.query(SQL, [
      uuid.v4(),
      customerId,
      restaurantId,
      partyCount,
      reservationDate,
    ]);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

const destroyReservation = async (id, customerId) => {
  try {
    const SQL = `DELETE FROM reservations WHERE id=$1 AND customer_id=$2;`;
    await client.query(SQL, [id, customerId]);
    return true;
  } catch (err) {
    console.error(err);
  }
};

const fetchReservations = async () => {
  try {
    const SQL = "SELECT * FROM reservations;";
    const { rows } = await client.query(SQL);
    return rows;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchRestaurants,
  fetchCustomers,
  createReservation,
  destroyReservation,
  fetchReservations,
};
