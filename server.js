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

// List all students (with optional search and sort)
app.get('/', (req, res) => {
  let students = readStudents();
  
  // Calculate Analytics
  const totalStudents = students.length;
  const uniqueCourses = new Set(students.map(s => (s.course || '').toLowerCase().trim())).size;
  
  const courseCounts = {};
  students.forEach(s => {
    const c = s.course || 'Unknown';
    courseCounts[c] = (courseCounts[c] || 0) + 1;
  });
  let topCourse = 'N/A';
  let maxCount = 0;
  for (const [c, count] of Object.entries(courseCounts)) {
    if (count > maxCount) { maxCount = count; topCourse = c; }
  }

  // Search
  const q = (req.query.q || '').toLowerCase();
  if (q) {
    students = students.filter(
      (s) =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.course || '').toLowerCase().includes(q)
    );
  }

  // Sort
  const sort = req.query.sort || 'name';
  const order = req.query.order === 'desc' ? -1 : 1;
  
  students.sort((a, b) => {
    const valA = (a[sort] || '').toLowerCase();
    const valB = (b[sort] || '').toLowerCase();
    if (valA < valB) return -1 * order;
    if (valA > valB) return 1 * order;
    return 0;
  });

  res.render('index', { 
    students, 
    q: req.query.q || '',
    stats: { totalStudents, uniqueCourses, topCourse },
    sort,
    order: req.query.order || 'asc'
  });
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

// Show view-student profile
app.get('/view/:id', (req, res) => {
  const students = readStudents();
  const student = students.find((s) => s.id === req.params.id);
  if (!student) return res.status(404).send('Student not found.');
  res.render('view', { student });
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

// Export students to CSV (supports active search filtering)
app.get('/export-csv', (req, res) => {
  const students = readStudents();
  const q = (req.query.q || '').toLowerCase();
  const filtered = q
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q)
      )
    : students;

  const headers = ['id', 'name', 'email', 'course', 'grade'];
  const rows = filtered.map((s) => {
    return [
      s.id,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${(s.course || '').replace(/"/g, '""')}"`,
      `"${(s.grade || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
  res.status(200).send(csvContent);
});


app.listen(PORT, () => {
  console.log(`Student Record System running at http://localhost:${PORT}`);
});
