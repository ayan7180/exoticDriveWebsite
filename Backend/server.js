// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "appointments";
const COLL_NAME = "loginAndAppointments";

let catalogCollection;

// Install these with: npm install cookie-parser uuid
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const sessions = {}; // { token: email }

// --- connect to Mongo ---
async function main() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const coll = client.db(DB_NAME).collection(COLL_NAME);
  catalogCollection = client.db("catalog").collection("carCatalog");

  // SIGN UP
  app.post("/signup", async (req, res) => {
    const { email, password, name, phone, admin } = req.body;
    // check if user exists
    if (await coll.findOne({ email, password: { $exists: true } })) {
      return res.status(400).json({ message: "User already exists" });
    }
    // insert user doc
    await coll.insertOne({ email, password, name, phone, admin });
    // create session
    const token = uuidv4();
    sessions[token] = email;
    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ message: "Signup successful" });
  });

  // LOGIN
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await coll.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = uuidv4();
    sessions[token] = email;
    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Login successful",
        admin: user.admin 
      });
  });

  // auth middleware
  function requireLogin(req, res, next) {
    const token = req.cookies.token;
    if (!token || !sessions[token]) {
      return res.status(401).end();
    }
    req.userEmail = sessions[token];
    next();
  }

  // ADD APPOINTMENT
  app.post("/addAppointment", requireLogin, async (req, res) => {
    const { date, time, serviceType } = req.body;
    await coll.insertOne({
      email: req.userEmail,
      date,
      time,
      serviceType,
    });
    res.status(201).json({ message: "Appointment added" });
  });

  // LIST APPOINTMENTS
  app.get("/app", requireLogin, async (req, res) => {
    const appts = await coll
      .find({ email: req.userEmail, date: { $exists: true } })
      .toArray();
    res.json(appts);
  });

  // DELETE ONE APPOINTMENT
  app.delete("/deleteAppointment/:id", requireLogin, async (req, res) => {
    await coll.deleteOne({
      _id: new ObjectId(req.params.id),
      email: req.userEmail,
    });
    res.json({ message: "Appointment deleted" });
  });

  app.put("/updateAppointment/:id", requireLogin, async (req, res) => {
    const { id } = req.params;
    const { date, time, serviceType } = req.body;
    await coll.updateOne(
      { _id: new ObjectId(id), email: req.userEmail },
      { $set: { date, time, serviceType } }
    );
    res.json({ message: "Appointment updated" });
  });

  // DELETE ACCOUNT + ALL THEIR APPOINTMENTS
  app.delete("/deleteAccount", requireLogin, async (req, res) => {
    await coll.deleteMany({ email: req.userEmail });
    // tear down session
    delete sessions[req.cookies.token];
    res.clearCookie("token");
    res.json({ message: "Account and appointments deleted" });
  });

  // GET car catalog
  app.get("/carCatalog", async (req, res) => {
    try {
      const results = await catalogCollection.find({}).limit(100).toArray();
      res.status(200).json(results);
    } catch (err) {
      console.error("Query error:", err);
      res.status(500).send("Failed to fetch car catalog");
    }
  });

  //POST car to Catalog
  app.post("/addCar", async (req, res) => {
    try {
      const newCar = req.body;
      console.log("Received data:", newCar); // Log the received data
      const result = await catalogCollection.insertOne(newCar);
      res.status(200).send(result);
    } catch (err) {
      console.error("Error adding car:", err);
      res.status(500).send("Failed to add car");
    }
  });

  //Delete car based on ID
  // Delete car based on ID
  app.delete("/deleteCar/:id", async (req, res) => {
    try {
      const result = await catalogCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });

      if (result.deletedCount === 0) {
        return res.status(404).send("Car not found");
      }

      res.status(200).json({ message: "Car deleted successfully" }); // ✅ Send success response
    } catch (err) {
      console.error("Error deleting car:", err);
      res.status(500).send("Failed to delete car");
    }
  });

  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );
}

main().catch(console.error);
