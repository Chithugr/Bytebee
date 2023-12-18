const express = require('express');
require('dot-env');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connect = require('./config/dbConfig.js');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/User";
const Router = require("./src/index.js");
const app = express();


connect(dbUrl).then(() => {

  app.use(express.json());
  app.use(cors());
  app.get('/', (req, res) => {
    return res.send({ status: "Ok" });
  })
  app.use('/apis', Router);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
)