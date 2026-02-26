const express = require('express');
const router = express.Router();
const Cohort = require('../models/cohort.model');

router.post('/', async (req, res, next) => {
  try {
    const newCohort = await Cohort.create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });
    res.status(201).json(newCohort);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get
router.get('/', (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log(cohorts.length);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.log('error');
      next(error);
    });
});

// Get details of a given cohort
router.get('/:cohortId', async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    console.log('error');
    next(error);
  }
});

// Updates a cohort
router.put('/:cohortId', async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { returnDocument: `after` },
    );
    res.status(200).json(cohort);
  } catch (error) {
    console.log('error');
    next(error);
  }
});

// Deletes a cohort
router.delete('/:cohortId', async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    res.status(200).json(cohort);
  } catch (error) {
    console.log('error');
    next(error);
  }
});
module.exports = router;
