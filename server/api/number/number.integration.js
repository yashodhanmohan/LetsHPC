'use strict';

var app = require('../..');
import request from 'supertest';

var newNumber;

describe('Number API:', function() {
  describe('GET /api/numbers', function() {
    var numbers;

    beforeEach(function(done) {
      request(app)
        .get('/api/numbers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          numbers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(numbers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/numbers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/numbers')
        .send({
           user_id: 'yashwant',
           problem_id : 1,
           category_id : 1,
           approach_id : 1,
           machine_id : 1,
           run_id : 1,
           n : 10000,
           p : 4,
           e2eS : 100,
           algS : 90,
           e2eP : 50,
           algP : 30
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNumber = res.body;
          done();
        });
    });

    it('should respond with the newly created number', function() {
      expect(newNumber.user_id).to.equal('yashwant');
      expect(newNumber.problem_id).to.equal(1);
      expect(newNumber.category_id).to.equal(1);
      expect(newNumber.approach_id).to.equal(1);
      expect(newNumber.machine_id).to.equal(1);
      expect(newNumber.n).to.equal(10000);
      expect(newNumber.p).to.equal(4);
      expect(newNumber.e2eS).to.equal(100);
      expect(newNumber.algS).to.equal(90);
      expect(newNumber.e2eP).to.equal(50);
      expect(newNumber.algP).to.equal(30);
    });
  });

  describe('GET /api/numbers/:id', function() {
    var number;

    beforeEach(function(done) {
      request(app)
        .get(`/api/numbers/${newNumber._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          number = res.body;
          done();
        });
    });

    afterEach(function() {
      number = {};
    });

    it('should respond with the requested number', function() {
      expect(number.user_id).to.equal('yashwant');
      expect(number.problem_id).to.equal(1);
      expect(number.category_id).to.equal(1);
      expect(number.approach_id).to.equal(1);
      expect(number.machine_id).to.equal(1);
      expect(number.n).to.equal(10000);
      expect(number.p).to.equal(4);
      expect(number.e2eS).to.equal(100);
      expect(number.algS).to.equal(90);
      expect(number.e2eP).to.equal(50);
      expect(number.algP).to.equal(30);
    });
  });

  describe('PUT /api/numbers/:id', function() {
    var updatedNumber;

    beforeEach(function(done) {
      request(app)
        .put(`/api/numbers/${newNumber._id}`)
        .send({
          user_id: 'yash1t',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNumber = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNumber = {};
    });

    it('should respond with the original number', function() {
      expect(updatedNumber.user_id).to.equal('yashwant');
      expect(updatedNumber.problem_id).to.equal(1);
      expect(updatedNumber.category_id).to.equal(1);
      expect(updatedNumber.approach_id).to.equal(1);
      expect(updatedNumber.machine_id).to.equal(1);
      expect(updatedNumber.n).to.equal(10000);
      expect(updatedNumber.p).to.equal(4);
      expect(updatedNumber.e2eS).to.equal(100);
      expect(updatedNumber.algS).to.equal(90);
      expect(updatedNumber.e2eP).to.equal(50);
      expect(updatedNumber.algP).to.equal(30);

    });

    it('should respond with the updated number on a subsequent GET', function(done) {
      request(app)
        .get(`/api/numbers/${newNumber._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let number = res.body;
          expect(number.user_id).to.equal('yash1t');
          expect(number.problem_id).to.equal(1);
          expect(number.category_id).to.equal(1);
          expect(number.approach_id).to.equal(1);
          expect(number.machine_id).to.equal(1);
          expect(number.n).to.equal(10000);
          expect(number.p).to.equal(4);
          expect(number.e2eS).to.equal(100);
          expect(number.algS).to.equal(90);
          expect(number.e2eP).to.equal(50);
          expect(number.algP).to.equal(30);

          done();
        });
    });
  });

/*
  describe('PATCH /api/numbers/:id', function() {
    var patchedNumber;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/numbers/${newNumber._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Number' },
          { op: 'replace', path: '/info', value: 'This is the patched number!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNumber = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNumber = {};
    });

    it('should respond with the patched number', function() {
      expect(patchedNumber.name).to.equal('Patched Number');
      expect(patchedNumber.info).to.equal('This is the patched number!!!');
    });
  });
*/
  describe('DELETE /api/numbers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/numbers/${newNumber._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when number does not exist', function(done) {
      request(app)
        .delete(`/api/numbers/${newNumber._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
