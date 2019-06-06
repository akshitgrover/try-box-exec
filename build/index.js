"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const env_1 = require("./env");
const app = express();
/*
  Set default ENVs
*/
env_1.default();
/*
  Lift server, Default on PORT = 3000
*/
app.listen(process.env.NODE_PORT);
