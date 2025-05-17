const mongoose = require("mongoose");
const express = require("express");
const Listing = require("./Models/listing");
const app = express();
const path = require("path");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Hello World from root");
});

app.get("/listings", async (req, res) => {
  const allListings=await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// app.get("/testListings", async (req, res) => {
//   let sampleListing = new listing({
//     title: "Sample Listing",
//     description: "This is a sample listing",
//     price: 100,
//     location: "Sample Location",
//     country: "Sample Country",
//   });
//   await sampleListing.save();
//   console.log("Sample listing saved to database");
//   res.send("Sample listing saved to database");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
