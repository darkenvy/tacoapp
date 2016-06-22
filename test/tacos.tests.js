var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('GET /tacos', function() {
  it('should return a 200', function(done) {
    request(app).get('/tacos').expect(200, done);
  });
});

describe('POST /tacos', function() {
  it('should create a taco and redirect to /tacos', function(done) {
    request(app)
      .post('/tacos')
      .type('form')
      .send({
        name: 'Doritos Locos',
        amount: 9001
      })
      .expect('Location', '/tacos')
      .expect(302, done);
  })
})

describe('PUT /tacos/:id', function() {
  it('should update taco to burrito and return 200', function(done) {
    request(app)
      .put('/tacos/1')
      .type('form')
      .send({
        name: 'Burrito',
        amount: 1
      })
      .expect(200, done);
  });
});

describe('GET /tacos/:id/edit', function() {
  it('should render /tacos/edit', function(done) {
    request(app)
      .get('/tacos/1/edit')
      .expect(200, done);
  })
})

describe('GET /tacos/:id', function() {
  it('should render /tacos/show', function(done) {
    request(app)
      .get('/tacos/1')
      .expect(200, done);
  });
});


describe('DELETE /tacos/:id', function() {
  it('should delete a taco, send a success message and return 200', function(done) {
    request(app)
      .delete('/tacos/1')
      .end(function(err, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('msg');
        expect(response.body.msg).to.equal('success');
        done();
      });
  });
});

describe('DELETE /tacos/:id', function() {
  it('should not delete anything because nothing is there. reuturn a 404', function(done) {
    request(app)
      .delete('/tacos/1')
      .end(function(err, response) {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.have.property('msg');
        expect(response.body.msg).to.equal('error');
        done();
      });
  });
});

describe('PUT /tacos/:id', function() {
  it('try to update taco. However we want a 404 because there are no tacos', function(done) {
    request(app)
      .put('/tacos/1')
      .type('form')
      .send({
        name: 'Burrito',
        amount: 1
      })
      .expect(404, done);
  });
});

describe('GET /tacos/new', function() {
  it('should render tacos/new', function(done) {
    request(app)
      .get('/tacos/new')
      .expect(200, done);
  });
});

describe('GET /tacos/:id/edit', function() {
  it('should try to render /tacos/edit, expect a 404', function(done) {
    request(app)
      .get('/tacos/1/edit')
      .expect(404, done);
  })
})

describe('GET /tacos/:id', function() {
  it('should try to render /tacos/show, expect a 404', function(done) {
    request(app)
      .get('/tacos/1')
      .expect(404, done);
  });
});
