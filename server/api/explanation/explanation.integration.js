'use strict';

var app = require('../..');
import request from 'supertest';

var newExplanation;

describe('Explanation API:', function() {
  describe('GET /api/explanations', function() {
    var explanations;

    beforeEach(function(done) {
      request(app)
        .get('/api/explanations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          explanations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(explanations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/explanations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/explanations')
        .send({
            user_id: 'yashwant',
            problem_id : 1,
            approach_id : 1,
            category_id : 1,
            approach_description : 'parallel',
            complexity : 'O(n)',
            estimated_ser_frac : '0.4334',
            diff_faced : 'none',
            possible_speedup : '4',
            advantage : 'none',
            disadvantage : 'none',
            serial_code : 'serial.c',
            parallel_code : 'parallel.c'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newExplanation = res.body;
          done();
        });
    });

    it('should respond with the newly created explanation', function() {
      expect(newExplanation.user_id).to.equal('yashwant');
      expect(newExplanation.problem_id).to.equal(1);
      expect(newExplanation.approach_id).to.equal(1);
      expect(newExplanation.category_id).to.equal(1);
      expect(newExplanation.approach_description).to.equal('parallel');
      expect(newExplanation.complexity).to.equal('O(n)');
      expect(newExplanation.estimated_ser_frac).to.equal('0.4334');
      expect(newExplanation.diff_faced).to.equal('none');
      expect(newExplanation.possible_speedup).to.equal('4');
      expect(newExplanation.advantage).to.equal('none');
      expect(newExplanation.disadvantage).to.equal('none');
      expect(newExplanation.serial_code).to.equal('serial.c');
      expect(newExplanation.parallel_code).to.equal('parallel.c');
    });
  });

  describe('GET /api/explanations/:id', function() {
    var explanation;

    beforeEach(function(done) {
      request(app)
        .get(`/api/explanations/${newExplanation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          explanation = res.body;
          done();
        });
    });

    afterEach(function() {
      explanation = {};
    });

    it('should respond with the requested explanation', function() {
      expect(explanation.user_id).to.equal('yashwant');
      expect(explanation.problem_id).to.equal(1);
      expect(explanation.approach_id).to.equal(1);
      expect(explanation.category_id).to.equal(1);
      expect(explanation.approach_description).to.equal('parallel');
      expect(explanation.complexity).to.equal('O(n)');
      expect(explanation.estimated_ser_frac).to.equal('0.4334');
      expect(explanation.diff_faced).to.equal('none');
      expect(explanation.possible_speedup).to.equal('4');
      expect(explanation.advantage).to.equal('none');
      expect(explanation.disadvantage).to.equal('none');
      expect(explanation.serial_code).to.equal('serial.c');
      expect(explanation.parallel_code).to.equal('parallel.c');

    });
  });

  describe('PUT /api/explanations/:id', function() {
    var updatedExplanation;

    beforeEach(function(done) {
      request(app)
        .put(`/api/explanations/${newExplanation._id}`)
        .send({
          user_id: 'yash1t'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedExplanation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedExplanation = {};
    });

    it('should respond with the original explanation', function() {
      expect(updatedExplanation.user_id).to.equal('yashwant');
      expect(updatedExplanation.problem_id).to.equal(1);
      expect(updatedExplanation.approach_id).to.equal(1);
      expect(updatedExplanation.category_id).to.equal(1);
      expect(updatedExplanation.approach_description).to.equal('parallel');
      expect(updatedExplanation.complexity).to.equal('O(n)');
      expect(updatedExplanation.estimated_ser_frac).to.equal('0.4334');
      expect(updatedExplanation.diff_faced).to.equal('none');
      expect(updatedExplanation.possible_speedup).to.equal('4');
      expect(updatedExplanation.advantage).to.equal('none');
      expect(updatedExplanation.disadvantage).to.equal('none');
      expect(updatedExplanation.serial_code).to.equal('serial.c');
      expect(updatedExplanation.parallel_code).to.equal('parallel.c');
    });

    it('should respond with the updated explanation on a subsequent GET', function(done) {
      request(app)
        .get(`/api/explanations/${newExplanation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let explanation = res.body;
          expect(explanation.user_id).to.equal('yashwant');
          expect(explanation.problem_id).to.equal(1);
          expect(explanation.approach_id).to.equal(1);
          expect(explanation.category_id).to.equal(1);
          expect(explanation.approach_description).to.equal('parallel');
          expect(explanation.complexity).to.equal('O(n)');
          expect(explanation.estimated_ser_frac).to.equal('0.4334');
          expect(explanation.diff_faced).to.equal('none');
          expect(explanation.possible_speedup).to.equal('4');
          expect(explanation.advantage).to.equal('none');
          expect(explanation.disadvantage).to.equal('none');
          expect(explanation.serial_code).to.equal('serial.c');
          expect(explanation.parallel_code).to.equal('parallel.c');

          done();
        });
    });
  });

/*
  describe('PATCH /api/explanations/:id', function() {
    var patchedExplanation;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/explanations/${newExplanation._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Explanation' },
          { op: 'replace', path: '/info', value: 'This is the patched explanation!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedExplanation = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedExplanation = {};
    });

    it('should respond with the patched explanation', function() {
      expect(patchedExplanation.name).to.equal('Patched Explanation');
      expect(patchedExplanation.info).to.equal('This is the patched explanation!!!');
    });
  });
*/
  describe('DELETE /api/explanations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/explanations/${newExplanation._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when explanation does not exist', function(done) {
      request(app)
        .delete(`/api/explanations/${newExplanation._id}`)
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
