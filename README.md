# 📚 Student Record System

A simple, open-source **Student Record Management System** built with Node.js, Express, and EJS. Add, edit, delete, and search student records through a clean web interface.

This project is intentionally kept simple — it's designed as a learning exercise in **open-source collaboration**: branching, issues, and pull requests.

---

## ✨ Features

- View all student records in a table
- Search students by name or course
- Add a new student
- Edit an existing student's details
- Delete a student record

## 🛠 Tech Stack

- **Node.js** + **Express** — server and routing
- **EJS** — server-side templating
- **JSON file** — simple storage (`data/students.json`), no database setup required

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or later
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/student-record-system.git
cd student-record-system

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The app will be running at **http://localhost:3000**.

For auto-restart during development:

```bash
npm run dev
```

## 📁 Project Structure

```
student-record-system/
├── data/
│   └── students.json     # student data storage
├── public/
│   └── style.css         # styling
├── views/
│   ├── index.ejs         # student list + search
│   ├── add.ejs            # add student form
│   └── edit.ejs           # edit student form
├── server.js               # Express app & routes
├── package.json
└── README.md
```

## 🤝 Contributing

This project is built for team collaboration practice. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before you start — it walks through branching, commit conventions, and how to open a pull request.

Quick version:

1. Pick or create an **issue** describing what you'll work on.
2. Create a branch off `main`: `git checkout -b feature/short-description`
3. Make your changes and commit with clear messages.
4. Push your branch and open a **pull request** back into `main`.
5. Request a review from a teammate before merging.

## 💡 Good First Issues / Ideas to Extend

- Add form validation (e.g. prevent duplicate emails)
- Add pagination for large student lists
- Add sorting by column (name, course, grade)
- Add a "view student profile" detail page
- Add unit tests (e.g. with Jest or Mocha)
- Add CSV export of student records
- Add authentication so only logged-in staff can edit records
- Replace JSON file storage with SQLite

## 📄 License

This project is licensed under the [MIT License](LICENSE).
