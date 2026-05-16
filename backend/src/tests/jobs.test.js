const request = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/jobs", () => {
  it("should return all jobs with success true", async () => {
    const res = await request(app).get("/api/jobs");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should filter by category", async () => {
    const res = await request(app).get("/api/jobs?category=Plumbing");
    expect(res.statusCode).toBe(200);
    res.body.data.forEach((job) => {
      expect(job.category).toBe("Plumbing");
    });
  });

  it("should filter by status", async () => {
    const res = await request(app).get("/api/jobs?status=Open");
    expect(res.statusCode).toBe(200);
    res.body.data.forEach((job) => {
      expect(job.status).toBe("Open");
    });
  });
});

describe("POST /api/jobs", () => {
  it("should create a new job with valid data", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "Test job for unit test",
      description: "This is a test job created by Jest",
      category: "Plumbing",
      location: "Glasgow",
      contactName: "Test User",
      contactEmail: "test@example.com",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Test job for unit test");
    expect(res.body.data.status).toBe("Open");
  });

  it("should return 400 if title is missing", async () => {
    const res = await request(app).post("/api/jobs").send({
      description: "Missing title test",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 if description is missing", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "Missing description test",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 if email is invalid", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "Invalid email test",
      description: "Testing invalid email validation",
      contactEmail: "not-an-email",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("GET /api/jobs/:id", () => {
  it("should return 404 for invalid id", async () => {
    const res = await request(app).get("/api/jobs/000000000000000000000000");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
