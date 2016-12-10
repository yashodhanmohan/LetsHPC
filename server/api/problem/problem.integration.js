'use strict';

var app = require('../..');
import request from 'supertest';

var newProblem;

describe('Problem API:', function() {
  describe('GET /api/problems', function() {
    var problems;

    beforeEach(function(done) {
      request(app)
        .get('/api/problems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          problems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(problems).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/problems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/problems')
        .send({
          problem_id : 1,
          problem_name : 'New Problem',
          problem_desc: 'This is the brand new problem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newProblem = res.body;
          done();
        });
    });

    it('should respond with the newly created problem', function() {
      expect(newProblem.problem_id).to.equal(1);
      expect(newProblem.problem_name).to.equal('New Problem');
      expect(newProblem.problem_desc).to.equal('This is the brand new problem!!!');
    });
  });

  describe('GET /api/problems/:id', function() {
    var problem;

    beforeEach(function(done) {
      request(app)
        .get(`/api/problems/${newProblem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          problem = res.body;
          done();
        });
    });

    afterEach(function() {
      problem = {};
    });

    it('should respond with the requested problem', function() {
      expect(problem.problem_id).to.equal(1);
      expect(problem.problem_name).to.equal('New Problem');
      expect(problem.problem_desc).to.equal('This is the brand new problem!!!');
    });
  });

  describe('PUT /api/problems/:id', function() {
    var updatedProblem;

    beforeEach(function(done) {
      request(app)
        .put(`/api/problems/${newProblem._id}`)
        .send({
          problem_name: 'Updated Problem',
          problem_desc: 'This is the updated problem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedProblem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProblem = {};
    });

    it('should respond with the original problem', function() {
      expect(updatedProblem.problem_id).to.equal(1);
      expect(updatedProblem.problem_name).to.equal('New Problem');
      expect(updatedProblem.problem_desc).to.equal('This is the brand new problem!!!');
    });

    it('should respond with the updated problem on a subsequent GET', function(done) {
      request(app)
        .get(`/api/problems/${newProblem._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let problem = res.body;
          expect(problem.problem_id).to,equal(1);
          expect(problem.problem_name).to.equal('Updated Problem');
          expect(problem.problem_desc).to.equal('This is the updated problem!!!');

          done();
        });
    });
  });

/*
  describe('PATCH /api/problems/:id', function() {
    var patchedProblem;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/problems/${newProblem._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Problem' },
          { op: 'replace', path: '/info', value: 'This is the patched problem!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedProblem = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedProblem = {};
    });

    it('should respond with the patched problem', function() {
      expect(patchedProblem.name).to.equal('Patched Problem');
      expect(patchedProblem.info).to.equal('This is the patched problem!!!');
    });
  });
*/
  describe('DELETE /api/problems/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/problems/${newProblem._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when problem does not exist', function(done) {
      request(app)
        .delete(`/api/problems/${newProblem._id}`)
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
