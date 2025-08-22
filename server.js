// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve your HTML files

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/zasp_loan", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log(err));

// Schema for registered users
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  idNumber: String,
  address: String,
  dob: Date,
  gender: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// Handle registration form submission
app.post("/submit", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      phone: req.body["phone number"],
      idNumber: req.body["id number"],
      address: req.body.address,
      dob: req.body.DOB,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password
    });

    await user.save();
    res.send("<h2>✅ Registration Successful!</h2><a href='/index.html'>Go Home</a>");
  } catch (error) {
    res.status(500).send("❌ Error saving user: " + error.message);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
