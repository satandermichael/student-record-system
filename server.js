const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'students.json');

// --- Middleware ---
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- Helpers ---
function readStudents() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

function writeStudents(students) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

function generateId() {
  return Date.now().toString();
}

// --- Routes ---

// List all students (with optional search)
app.get('/', (req, res) => {
  const students = readStudents();
  const q = (req.query.q || '').toLowerCase();
  const filtered = q
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q)
      )
    : students;
  res.render('index', { students: filtered, q: req.query.q || '' });
});

// Show add-student form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add-student submission
app.post('/add', (req, res) => {
  const { name, email, course, grade } = req.body;
  if (!name || !email || !course) {
    return res.status(400).send('Name, email, and course are required.');
  }
  const students = readStudents();
  students.push({ id: generateId(), name, email, course, grade: grade || '' });
  writeStudents(students);
  res.redirect('/');
});

// Show edit-student form
app.get('/edit/:id', (req, res) => {
  const students = readStudents();
  const student = students.find((s) => s.id === req.params.id);
  if (!student) return res.status(404).send('Student not found.');
  res.render('edit', { student });
});

// Handle edit-student submission
app.post('/edit/:id', (req, res) => {
  const { name, email, course, grade } = req.body;
  const students = readStudents();
  const index = students.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).send('Student not found.');
  students[index] = { id: req.params.id, name, email, course, grade: grade || '' };
  writeStudents(students);
  res.redirect('/');
});

// Delete a student
app.post('/delete/:id', (req, res) => {
  const students = readStudents();
  const filtered = students.filter((s) => s.id !== req.params.id);
  writeStudents(filtered);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Student Record System running at http://localhost:${PORT}`);
});
