'use strict';

var app = require('../..');
import request from 'supertest';

var newCpmap;

describe('Cpmap API:', function() {
  describe('GET /api/cpmaps', function() {
    var cpmaps;

    beforeEach(function(done) {
      request(app)
        .get('/api/cpmaps')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          cpmaps = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cpmaps).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/cpmaps', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cpmaps')
        .send({
          cpmap_problem_id : 1,
          cpmap_category_id : 2
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCpmap = res.body;
          done();
        });
    });

    it('should respond with the newly created cpmap', function() {
      expect(newCpmap.cpmap_problem_id).to.equal(1);
      expect(newCpmap.cpmap_category_id).to.equal(2);
    });
  });

  describe('GET /api/cpmaps/:id', function() {
    var cpmap;

    beforeEach(function(done) {
      request(app)
        .get(`/api/cpmaps/${newCpmap._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          cpmap = res.body;
          done();
        });
    });

    afterEach(function() {
      cpmap = {};
    });

    it('should respond with the requested cpmap', function() {
      expect(cpmap.cpmap_problem_id).to.equal(1);
      expect(cpmap.cpmap_category_id).to.equal(2);

    });
  });

  describe('PUT /api/cpmaps/:id', function() {
    var updatedCpmap;

    beforeEach(function(done) {
      request(app)
        .put(`/api/cpmaps/${newCpmap._id}`)
        .send({
          cpmap_problem_id: 2,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCpmap = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCpmap = {};
    });

    it('should respond with the original cpmap', function() {
      expect(updatedCpmap.cpmap_problem_id).to.equal(1);
      expect(updatedCpmap.cpmap_category_id).to.equal(2);
    });

    it('should respond with the updated cpmap on a subsequent GET', function(done) {
      request(app)
        .get(`/api/cpmaps/${newCpmap._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let cpmap = res.body;
          expect(cpmap.cpmap_problem_id).to.equal(1);
          expect(cpmap.cpmap_category_id).to.equal(2);
          done();
        });
    });
  });

/*
  describe('PATCH /api/cpmaps/:id', function() {
    var patchedCpmap;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/cpmaps/${newCpmap._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Cpmap' },
          { op: 'replace', path: '/info', value: 'This is the patched cpmap!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCpmap = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCpmap = {};
    });

    it('should respond with the patched cpmap', function() {
      expect(patchedCpmap.name).to.equal('Patched Cpmap');
      expect(patchedCpmap.info).to.equal('This is the patched cpmap!!!');
    });
  });
*/
  describe('DELETE /api/cpmaps/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/cpmaps/${newCpmap._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cpmap does not exist', function(done) {
      request(app)
        .delete(`/api/cpmaps/${newCpmap._id}`)
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
