const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
require('./db');

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
const config = require('./config');
config(app);

const indexRouter = require('./routes/index.routes');
app.use('/api', indexRouter);

const handlingError = require('./errors');
handlingError(app);
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
