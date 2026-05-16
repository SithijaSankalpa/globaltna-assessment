const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const JobRequest = require("./models/JobRequest");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const jobs = [
  {
    title: "Leaking kitchen tap needs urgent fix",
    description:
      "My kitchen tap has been leaking for 3 days. Water is pooling under the sink. Need someone ASAP.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "John Smith",
    contactEmail: "john.smith@email.com",
    status: "Open",
  },
  {
    title: "Bathroom rewiring required",
    description:
      "Old bathroom wiring needs full replacement. Some sockets are sparking. Safety concern.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Sarah Connor",
    contactEmail: "sarah.c@email.com",
    status: "Open",
  },
  {
    title: "Living room and hallway painting",
    description:
      "Need the living room and hallway painted. Walls are currently magnolia, want a fresh white finish.",
    category: "Painting",
    location: "Manchester",
    contactName: "David Brown",
    contactEmail: "david.b@email.com",
    status: "In Progress",
  },
  {
    title: "Kitchen cabinet installation",
    description:
      "New flat-pack kitchen cabinets need assembling and fitting. About 12 units total.",
    category: "Joinery",
    location: "Birmingham",
    contactName: "Emma Wilson",
    contactEmail: "emma.w@email.com",
    status: "Open",
  },
  {
    title: "Boiler making loud banging noise",
    description:
      "Boiler has been making a loud banging noise every morning. Needs inspection and repair.",
    category: "Plumbing",
    location: "Leeds",
    contactName: "Mike Taylor",
    contactEmail: "mike.t@email.com",
    status: "Open",
  },
  {
    title: "Garden shed electrical hook-up",
    description:
      "Need power running from the house to a new garden shed. About 15 metres of cable needed.",
    category: "Electrical",
    location: "Bristol",
    contactName: "Laura Jones",
    contactEmail: "laura.j@email.com",
    status: "Closed",
  },
  {
    title: "External fence painting",
    description:
      "Large garden fence needs sanding and repainting. Approximately 30 metres long.",
    category: "Painting",
    location: "Glasgow",
    contactName: "Robert Davis",
    contactEmail: "robert.d@email.com",
    status: "Open",
  },
  {
    title: "Bespoke bookshelf build",
    description:
      "Looking for a joiner to build a floor-to-ceiling bookshelf in the study. Oak finish preferred.",
    category: "Joinery",
    location: "London",
    contactName: "Alice Martin",
    contactEmail: "alice.m@email.com",
    status: "Open",
  },
  {
    title: "Shower pressure too low",
    description:
      "Shower has very low pressure. Had a plumber look at it before but problem has returned.",
    category: "Plumbing",
    location: "Cardiff",
    contactName: "Tom Hughes",
    contactEmail: "tom.h@email.com",
    status: "In Progress",
  },
  {
    title: "Garage ceiling needs replastering",
    description:
      "Garage ceiling has water damage from a roof leak that has now been fixed. Needs replastering.",
    category: "Other",
    location: "Newcastle",
    contactName: "Helen Clark",
    contactEmail: "helen.c@email.com",
    status: "Open",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await JobRequest.deleteMany({});
    console.log("🗑  Cleared existing jobs");

    await JobRequest.insertMany(jobs);
    console.log("🌱 Seeded 10 sample jobs successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
