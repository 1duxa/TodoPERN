const express = require("express");


const dotenv = require("dotenv").config({ path: "./src/.env" });
const cors = require("cors");
const morgan = require("morgan")
const app = express();

const router = require('./router');
const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(router);


//configure




app.listen(PORT, () => {
  console.log("app is running");
});