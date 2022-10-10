const path = require("path");
const pool = require("./db");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

app.post(
  "/api",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("message").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, message } = req.body;
      const newPerson = pool.query(
        "INSERT INTO users (name,email,message) values ($1, $2, $3)",
        [name, email, message]
      );
      return res.status(200).json({ success: true });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`, process.env.NODE_ENV);
});
