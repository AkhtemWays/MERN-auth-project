const express = require("express");

const mongoose = require("mongoose");
const config = require("config");
const PORT = config.get("port") || 5000;
const mongouri = config.get("mongouri");

app = express();
app.use(express.json({ extended: true }));
app.use("/", require("./routes/home.routes"));

const start = async () => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, console.log(`Listening to port ${PORT}...`));
  } catch (e) {
    throw new Error("Server error", e.message);
  }
};

start();
