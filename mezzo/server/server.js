require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require("./api");
const spotify = require("./spotify_api");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();


const cors = require('cors'); //cors stuff

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());


const port = process.env.PORT || 4000;
mongoose.set('strictQuery', true);

app.use(express.static(path.join(__dirname, 'build')));

app.use(
  morgan("dev"),
  bodyParser.json({ extended: false }),
  bodyParser.urlencoded({ extended: false })
);

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use("/api", api);
app.use("/_", spotify);

app.all('*', (req, res) => {
  res.status(404).send('<h1>404<h1> <h2>Page not found</h2>');
})

async function main() {
  if (process.env.MONGO_MODE == "production") {
    await mongoose.connect(`mongodb://192.168.171.67:27017/${process.env.MONGO_USER}`, {
      useNewUrlParser: true,
      authSource: "admin",
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
    });
  } else {
    console.log("MongoDB connected...")
    await mongoose.connect("mongodb://localhost:27017/Mezzo");
  }

  app.listen(port, () => {
    console.log(`App on port: ${port}`);
  });
}

main().catch((err) => console.error(err));
