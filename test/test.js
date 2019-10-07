var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe("make_guid",function(){

  it("should tell us it is an Express server",function(done){
    // calling home page
    server
    .get("/api/v1/make_guid")
    .expect("X-Powered-By",/Express/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

});
