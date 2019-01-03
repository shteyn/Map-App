const request = require("supertest");

const app = require("../src/app");

describe("GET /api/v1", () => {
  it("responds with a json message", function(done) {
    request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API"
        },
        done
      );
  });
});

describe("POST /api/v1/messages", () => {
  it("responds with inserted message", done => {
    const requestObj = {
      name: "Anna",
      message: "Hi there",
      latitude: -90,
      longitude: 180
    };
    const responseObj = {
      ...requestObj,
      _id: "5c0fb0823e719c071d59be59",
      date: "2018-12-11T12:41:38.238Z"
    };
    request(app)
      .post("/api/v1/messages")
      .send(requestObj)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        res.body._id = "5c0fb0823e719c071d59be59";
        res.body.date = "2018-12-11T12:41:38.238Z";
      })
      .expect(200, responseObj, done);
  });
});
