const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Static bearer token — set API_TOKEN in Render's environment variables.
// Falls back to this value for local testing only; don't rely on the
// fallback in production.
const API_TOKEN = process.env.API_TOKEN || "my-hardcoded-dev-token-123456";

const USERS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com" },
  { id: 4, name: "Diana Lee", email: "diana@example.com" },
  { id: 5, name: "Ethan Brown", email: "ethan@example.com" },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token || token !== API_TOKEN) {
    return res.status(401).json({ error: "Invalid or missing bearer token" });
  }

  next();
}

app.get("/users", authenticateToken, (req, res) => {
  res.json({ users: USERS });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
