const supertest = require("supertest");
const app = require("./app");

const request = supertest(app);

describe("Event API Tests", () => {
  it("should create an event", async () => {
    const response = await request
      .post("/create-event")
      .send({ name: "Test Event", description: "Test Description" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event added successfully");
  });

  it("should categorize an event", async () => {
    await request.post("/create-event").send({ name: "Test Event" });
    const response = await request
      .post("/categorize")
      .send({ name: "Test Event", category: "Music" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Category updated successfully");
  });

  it("should return events of a category", async () => {
    await request.post("/create-event").send({ name: "Test Event", category: "Music" });
    const response = await request.get("/view-event").send({ category: "Music" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should create a user", async () => {
    const response = await request
      .post("/users")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
