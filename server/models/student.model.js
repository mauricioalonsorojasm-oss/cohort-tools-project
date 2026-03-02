const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: { type: Array, default: [] },
  program: String,
  background: String,
  image: String,
  projects: { type: Array, default: [] },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: 'Cohort' },
});

const Student = mongoose.model('Student', studentsSchema);

module.exports = Student;
