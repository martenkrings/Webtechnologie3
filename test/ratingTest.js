/**
 * A test for authentication
 */
// var mocha = require('mocha');
var supertest = require('supertest');
var should = require('should');

var server = supertest.agent("http://localhost:3000");
var token;

describe("Rating", function () {

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
    describe('DeleteRating', function () {
        it("should delete an existing rating", function (done) {
            server
                .delete("/api/ratings/delete")
                .set("authorization", token)
                .send({"ttNumber" : "tt03877808"})
                .expect(200)
                .end(function (err, res) {
                    done(err);
                })
        })
    });

    //test 3
    describe("MyRatings", function () {
        it("should give rating asociated with the logged in user", function (done) {
            server
                .get("/api/ratings/myRatings")
                .set("authorization", token)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                })
        })
    });

    //test 4
    describe("Change rating", function () {
        it("should change a rating", function (done) {
            server
                .put("/api/ratings/change")
                .set("authorization", token)
                .send({"rating": 4})
                .send({"title": "Men in Black"})
                .expect(200)
                .end(function (err, res) {
                    done(err);
                })
        })
    });

    //test 5
    describe("Get all films with average rating", function () {
        it("should get all films with their average rating", function (done) {
            server
                .get("/api/ratings")
                .set("authorization", token)
                .expect(200)
                .expect("Content-type", /json/)
                .end(function (err, res) {
                    done(err);
                })
        })
    });

    //test 6
    describe("Delete a rating", function () {
        it("should delete a rating", function (done) {
            server
                .delete("/api/ratings/delete")
                .set("authorization", token)
                .send({"ttNumber": "tt03877808"})
                .expect(200)
                .expect("Content-type", /json/)
                .end(function (err, res) {
                    done(err);
                })
        })
    })
});