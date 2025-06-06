const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");
const MONGO_URL =
  "mongodb+srv://khushi:RvBXfGWY0gVxCJjl@wanderlust.6tdrawv.mongodb.net/?retryWrites=true&w=majority&appName=Wanderlust";
main()
  .then(() => {
    console.log("✅ Connected to MongoDB");
    initDB();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data.map((obj) => ({
    ...obj,
    owner: "683fea959b18e4fd5d2f9734",
  }));
  const transformedData = initData.data.map((listing) => {
    return {
      title: listing.title,
      description: listing.description,
      image: listing.image.url, // Extract just the URL
      price: listing.price,
      location: listing.location,
      country: listing.country,
      owner: "683fea959b18e4fd5d2f9734", // Replace with actual owner ID
    };
  });
  console.log("Sample transformed item:", transformedData[0]);

  await Listing.insertMany(transformedData);
  console.log("Database initialized with sample data");
};
