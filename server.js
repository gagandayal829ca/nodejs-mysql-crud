const express = require("express");
const morgan = require("morgan");
const mySqlPool = require("./config/db");

require("dotenv").config();
const app = express();

// Middleware
app.use(morgan("dev"));

// Routes
app.use("/api/v1/student", require("./routes/studentsRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT;

//Conditionally listen
mySqlPool
  .query("SELECT 1")
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB is connected");
      console.log(`Server running at PORT:${PORT}`);
    });
  })
  .catch((error) => console.log("error: " + error));
