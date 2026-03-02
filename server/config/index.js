const express = require("express");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

function config(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: [process.env.SERVER_URL, "http://localhost:5173"],
    }),
  );
}
module.exports = config;
