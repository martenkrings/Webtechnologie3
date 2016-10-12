/**
 * A test for films
 */
// var mocha = require('mocha');
var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:3000");

//test 1
describe("film", function () {
    it("Should return a list of all films in the database", function (done) {
        server
            .get("/api/films")
            .expect(200)
            .expect("Content-type", /json/)
            .end(function (err, res) {
                done(err)
            })
    });
});