/**
 * A test for authentication
 */
// var mocha = require('mocha');
var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:3000");

describe('Authentication', function () {
    it("should get a valid authentication token", function (done) {
        server
            .post("/api/authenticate")
            .send({"username": "Sander"})
            .expect("Content-type", /json/)
            .expect(201)
            .end(function (err, res) {
                done(err);
            });
    })
});