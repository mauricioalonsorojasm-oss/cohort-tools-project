const express = require('express');
const router = express.Router();

router.get('/docs', (req, res) => {
  res.sendFile(__dirname + '/views/docs.html');
});

const studentRoutes = require('./students.routes');
router.use('/students', studentRoutes);
const cohortRoutes = require('./cohort.routes');
router.use('/cohorts', cohortRoutes);

module.exports = router;
