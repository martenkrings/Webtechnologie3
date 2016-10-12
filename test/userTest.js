/**
 * A test for authentication
 */
// var mocha = require('mocha');
var supertest = require('supertest');
var should = require('should');
var User = require("../model/user.js");

var server = supertest.agent("http://localhost:3000");
var token;

describe("User", function () {

    // test 1
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

    //test 2
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

    //test 3
    describe("Register without insertion", function () {
        it("Should register a new user having not having an insertion", function (done) {
            server
                .post("/api/users/register")
                .send({"firstname" : "Bannaan"})
                .send({"lastname": "Dels"})
                .send({"username": "lacherd"})
                .send({"password": "mus"})
                .expect("Content-type", /json/)
                .expect(201)
                .end(function (err, res) {
                    done(err);
                });
        })
    });

    //test 4
    describe("Users", function () {
        it("Should get all users", function (done) {
            server
                .get("/api/users")
                .set("authorization", token)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });
        })
    });
});