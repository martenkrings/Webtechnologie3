/**
 * A test for authentication
 */
// var mocha = require('mocha');
var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:3000");
var token;

describe("User", function () {

    //test 1
    describe("Register with insertion", function () {
        it("Should register a new user having an insertion", function (done) {
            server
                .post("/api/users/register")
                .send({"firstname" : "Henk"})
                .send({"insertion" : "van"})
                .send({"lastname": "Beld"})
                .send({"username": "grapperd"})
                .send({"password": "huis"})
                .expect("Content-type", /json/)
                .expect(201)
                .end(function (err, res) {
                    done(err);
                });
        })
    });

    // test 3
    describe('Authentication', function () {
        it("should get a valid authentication token", function (done) {
            server
                .post("/api/authenticate")
                .send({"username": "Sander"})
                .send({"password": "lol"})
                .expect("Content-type", /json/)
                .expect(201)
                .end(function (err, res) {
                    token = res.body.token;
                    done(err);
                });
        })
    });
});