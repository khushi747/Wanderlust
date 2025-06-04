const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data.map((obj) => ({
    ...obj,
    owner: "6832f09d4051d7967e0c9751",
  }));
  const transformedData = initData.data.map((listing) => {
    return {
      title: listing.title,
      description: listing.description,
      image: listing.image.url, // Extract just the URL
      price: listing.price,
      location: listing.location,
      country: listing.country,
      owner: "6832f09d4051d7967e0c9751", // Replace with actual owner ID
    };
  });
  console.log("Sample transformed item:", transformedData[0]);

  await Listing.insertMany(transformedData);
  console.log("Database initialized with sample data");
};

initDB();
