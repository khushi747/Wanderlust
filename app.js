const mongoose = require("mongoose");
const express = require("express");
const app = express();
 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  console.log("Trying to connect to MongoDB...");
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
 
app.get("/", (req, res) => {
  res.send("Hello World from root");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
