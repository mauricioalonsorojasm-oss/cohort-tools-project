const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Cohort = require('./models/cohort.model');
const Student = require('./models/student.model');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/cohort-tools-api')
  .then((x) =>
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    ),
  )
  .catch((err) => console.error('Error connecting to mongo', err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5005'],
  }),
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get('/docs', (req, res) => {
  res.sendFile(__dirname + '/views/docs.html');
});

// COHORTS

// Create

app.post("/api/cohorts", async (req, res) => {
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
            totalHours: req.body.totalHours
        })
        res.status(201).json(newCohort)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// Get
app.get('/api/cohorts', (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log(cohorts.length);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.log('error');
      res.status(500).json({ error: 'Failed to retrieve cohorts' });
    });
});

// Get details of a given cohort
app.get("/api/cohorts/:cohortId", async (req, res) => {
    try {
        const cohort = await Cohort.findById(req.params.cohortId)
        res.status(200).json(cohort)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to retrieve cohort' });
    }
})

// Updates a cohort
app.put("/api/cohorts/:cohortId", async (req, res) => {
    try {
        const cohort = await Cohort.findByIdAndUpdate(
          req.params.cohortId, 
          req.body,
          { returnDocument: `after` }
        )
        res.status(200).json(cohort)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to update cohort' });
    }
})

// Deletes a cohort
app.delete("/api/cohorts/:cohortId", async (req, res) => {
    try {
        const cohort = await Cohort.findByIdAndDelete(req.params.cohortId)
        res.status(200).json(cohort)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to delete cohort' });
    }
})

// STUDENTS

// Create

app.post("/api/students", async (req, res) => {
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
            cohort: req.body.cohort
        })
        res.status(201).json(newStudent)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// Get
app.get('/api/students', (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((error) => {
      console.log('error');
      res.status(500).json({ error: 'Failed to retrieve students' });
    });
});

// Get all students of a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
    try {
        const students = await Student
          .find({ cohort: req.params.cohortId })
          .populate("cohort")
        res.status(200).json(students)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
})

// Get details of a given student
app.get("/api/students/:studentId", async (req, res) => {
    try {
        const student = await Student
            .findById(req.params.studentId)
            .populate("cohort")
        res.status(200).json(student)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to retrieve student' });
    }
})

// Updates a student
app.put("/api/students/:studentId", async (req, res) => {
    try {
        const student = await Student
            .findByIdAndUpdate(
              req.params.studentId, 
              req.body,
              { returnDocument: `after` }
            )
        res.status(200).json(student)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to update student' });
    }
})

// Deletes a student
app.delete("/api/students/:studentId", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.studentId)
        res.status(200).json(student)
    } catch (error) {
        console.log('error');
        res.status(500).json({ error: 'Failed to delete student' });
    }
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
