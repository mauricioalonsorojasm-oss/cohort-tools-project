const express = require('express');
const router = express.Router();
const Student = require('./models/student.model');

router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedUrl: req.body.linkedUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      projects: req.body.projects,
      cohort: req.body.cohort,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get
router.get('/', (req, res) => {
  Student.find({})
    .populate('cohort')
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.log('error');
      res.status(500).json({ error: 'Failed to retrieve students' });
    });
});

// Get all students of a given cohort
router.get('/:cohortId', async (req, res) => {
  try {
    const students = await Student.find({
      cohort: req.params.cohortId,
    }).populate('cohort');
    res.status(200).json(students);
  } catch (error) {
    console.log('error');
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
});

// Get details of a given student
router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      'cohort',
    );
    res.status(200).json(student);
  } catch (error) {
    console.log('error');
    res.status(500).json({ error: 'Failed to retrieve student' });
  }
});

// Updates a student
router.put('/:studentId', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { returnDocument: `after` },
    );
    res.status(200).json(student);
  } catch (error) {
    console.log('error');
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Deletes a student
router.delete('/:studentId', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    res.status(200).json(student);
  } catch (error) {
    console.log('error');
    res.status(500).json({ error: 'Failed to delete student' });
  }
});
module.exports = router;
