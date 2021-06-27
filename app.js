const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
// const env = require('./config/connection');

const app = express();

app.use(cors());

app.use(bodyParser.json());



app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

const troopRoutes = require("./router/index.routes");

app.use("/api/Trootech", troopRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});