/**
 * Created by Sander on 10-10-2016.
 */
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
    })

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
    })
});