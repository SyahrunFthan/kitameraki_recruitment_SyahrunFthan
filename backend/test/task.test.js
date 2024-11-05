const request = require("supertest");
const app = require("../src/app.js");
const expect = require("chai").expect;

// Post Data
describe("POST /task", () => {
  it("Success Created", async function () {
    const response = await request(app)
      .post("/task")
      .send({
        title: "Tugas Bahasa Inggris",
        description: "Tugas 2 ini adalah tugas pertama saya",
        dueDate: "2024-11-05",
        priority: "High",
        status: "Todo",
        tags: ["Tugas2", "Sekolah"],
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("message");
  });
});

// Get data With Pagination
describe("GET /task", () => {
  it("should return tasks successfully", async function () {
    const response = await request(app).get(
      "/task?limit=5&page=1&search=matematika"
    );

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property("response").that.is.an("array");
  });
});

// get by id
describe("GET /task:id", () => {
  it("should return tasks successfully", async function () {
    const response = await request(app).get("/task/672a4729cc41dc5f7e53f6a1");

    expect(response.status).to.equal(200);

    expect(response.body).to.have.property("response");
  });
});

// Update Data
describe("UPDATE /task:id", () => {
  it("Success Updated", async function () {
    const response = await request(app)
      .put("/task/672a4729cc41dc5f7e53f6a1")
      .send({
        title: "Tugas Matematika",
        description: "Tugas 2 ini adalah tugas pertama saya",
        dueDate: "2024-11-05",
        priority: "High",
        status: "Todo",
        tags: ["Tugas2", "Sekolah"],
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("message");
  });
});

// Delete Data
describe("DELETE /task:id", () => {
  it("Delete Success", async function () {
    const response = await request(app).delete(
      "/task/672a5de2b9ccd9075333060d"
    );

    expect(response.status).to.equal(204);
    expect(response.body).to.be.empty;
  });
});
