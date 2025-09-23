
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();


app.use(express.static(path.join(__dirname, "public"))); // Serve HTML, CSS, JS from /public


mongoose.connect("mongodb://127.0.0.1:27017/zap_loan", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  idNumber: String,
  address: String,
  dob: Date,
  gender: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);


app.post("/submit", async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      phone: req.body.phone,       
      idNumber: req.body.id_number, 
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();
    res.send("<h2>✅ Registration Successful!</h2><a href='/index.html'>Go Home</a>");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error saving user: " + error.message);
  }
});


const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
