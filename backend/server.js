const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT = 3001;

const AUTH_FILE = path.join(__dirname, '/auth/auth.json');

// Middleware for session storage
app.use(
  session({
    store: new FileStore({
      path: './data/sessions', // Persistent session storage
    }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure=true for HTTPS
  })
);

const DROID_HOST = process.env.REACT_APP_DROID_HOST;
const backendURL = 'http://' + DROID_HOST + ':3001';
console.log ('backendURL', backendURL)

// Enable CORS for the frontend
// app.use(cors({ credentials: true, origin: {backendURL} }));
app.use(cors({ credentials: true, origin: {backendURL} }));
app.use(bodyParser.json());

// Create `auth.json` if it does not exist
if (!fs.existsSync(AUTH_FILE)) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ users: [] }, null, 2));
}

// Login route
app.post('/doLogin', (req, res) => {
  console.log(req);
  const { username, password } = req.body;
  fs.readFile(AUTH_FILE, (err, data) => {
    if (err) return res.status(500).send({ message: 'Internal Server Error' });
    const users = JSON.parse(data).users;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      req.session.user = { username };
      return res.status(200).send({ message: 'Login successful' });
    }
    res.status(401).send({ message: 'Invalid credentials' });
  });
});

// Registration route
app.post('/doRegister', (req, res) => {
  const { username, password } = req.body;
  fs.readFile(AUTH_FILE, (err, data) => {
    if (err) return res.status(500).send({ message: 'Internal Server Error' });
    const users = JSON.parse(data).users;
    if (users.find((u) => u.username === username)) {
      return res.status(409).send({ message: 'User already exists' });
    }
    users.push({ username, password });
fs.writeFile(AUTH_FILE, JSON.stringify({ users }, null, 2), (err) => {
  if (err) {
    // Remplace le message générique par le message d'erreur spécifique
    return res.status(500).send({ message: err.message });
  }
  res.status(201).send({ message: 'User registered successfully' });
});

  });
});

// Check authentication status
app.get('/doCheck-auth', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ authenticated: true, user: req.session.user });
  }
  res.status(200).json({ authenticated: false });
});

// Logout route
app.post('/doLogout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid'); // Efface le cookie de session
    res.status(200).send({ message: 'Logout successful' });
  });
});


// Routes for the React App
// Serve static files from the React app build directory
// For any requests that don't match an API route or a static file, serve the React app index.html (handles routing on the frontend)
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
