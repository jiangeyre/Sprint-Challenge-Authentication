const request = require("supertest");
const server = require("../api/server.js");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1ODA0OTA5NTIsImV4cCI6MTU4MDU3NzM1Mn0.4CXxPFONMsNm2rzWXc7EhaxOa6E5hUb2y4PGJEcey_I";

describe("server", function() {

  describe("GET from /api/jokes/", function() {
    it("should return 200", function() {
      return request(server)
        .get("/api/jokes/")
        .set('authorization', token)
        .then(res => {
          expect(res.status).toBe(200);
        })
    })

    it("should return a JSON formatted response", function() {
      return request(server)
        .get("/api/jokes/")
        .set('authorization', token)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should have jokes in the array", function() {
      return request(server)
        .get("/api/jokes/")
        .set('authorization', token)
        .then(res => {
          expect(res.text).not.toHaveLength(0);
        });
    })
  })
});