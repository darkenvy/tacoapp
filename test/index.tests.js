var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');

describe('get /', function() {
  //tests go here
  it('should return a 200 response', function(done) {
    request(app).get('/').expect(200, done);
  })
})
