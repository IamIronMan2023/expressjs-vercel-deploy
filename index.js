require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
//testing git fork by jaime
const logger = require("./middlewares/logger");
const userRoutes = require("./routes/Users");
const authenticationRoutes = require("./routes/Authentication");
const employeeRoutes = require("./routes/Employees");
const auth = require("./middlewares/auth");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.HOST + process.env.DB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database..."));

// yalung added branch for demo activity
//middle ware separate topic
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// app.use(logger);

// app.use("/api", authenticationRoutes);

// app.use(auth);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}...`);
});
