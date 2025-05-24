const mongoose = require("mongoose");
const express = require("express");
const Listing = require("./Models/listing");
const Review = require("./Models/review");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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
app.use(express.urlencoded({ extended: true })); // allows us to parse data from request body or url
app.use(methodOverride("_method")); // allows us to use PUT and DELETE requests
app.engine("ejs", ejsMate); // tell Express to use ejs-mate for .ejs files
app.use(express.static(path.join(__dirname, "public"))); //allows us to use static files from public folder, so now href="/css/styles.css" = herf="/public/css/styles.css"

app.get("/", (req, res) => {
  res.send("Hello World from root");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
