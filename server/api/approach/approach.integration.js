'use strict';

var app = require('../..');
import request from 'supertest';

var newApmap;

describe('Apmap API:', function() {
    describe('GET /api/apmaps', function() {
        var apmaps;

        beforeEach(function(done) {
            request(app)
                .get('/api/apmaps')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    apmaps = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            expect(apmaps).to.be.instanceOf(Array);
        });
    });

    describe('POST /api/apmaps', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/apmaps')
                .send({
                    apmap_problem_id: 1,
                    apmap_approach_id: 2,
		    apmap_approach_desc : 'Test Approach'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newApmap = res.body;
                    done();
                });
        });

        it('should respond with the newly created apmap', function() {
            expect(newApmap.apmap_problem_id).to.equal(1);
            expect(newApmap.apmap_approach_id).to.equal(2);
            expect(newApmap.apmap_approach_desc).to.equal('Test Approach');
        });
    });

    describe('GET /api/apmaps/:id', function() {
        var apmap;

        beforeEach(function(done) {
            request(app)
                .get(`/api/apmaps/${newApmap._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    apmap = res.body;
                    done();
                });
        });

        afterEach(function() {
            apmap = {};
        });

        it('should respond with the requested apmap', function() {
            expect(apmap.apmap_problem_id).to.equal(1);
            expect(apmap.apmap_approach_id).to.equal(2);
            expect(apmap.apmap_approach_desc).to.equal('Test Approach');
        });
    });

    describe('PUT /api/apmaps/:id', function() {
        var updatedApmap;

        beforeEach(function(done) {
            request(app)
                .put(`/api/apmaps/${newApmap._id}`)
                .send({
                    apmap_problem_id: 2
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedApmap = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedApmap = {};
        });

        it('should respond with the original apmap', function() {
            expect(updatedApmap.apmap_problem_id).to.equal(1);
            expect(updatedApmap.apmap_approach_id).to.equal(2);
            expect(updatedApmap.apmap_approach_desc).to.equal('Test Approach');
        });

        it('should respond with the updated apmap on a subsequent GET', function(done) {
            request(app)
                .get(`/api/apmaps/${newApmap._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let apmap = res.body;
                    expect(apmap.apmap_problem_id).to.equal(2);
                    expect(apmap.apmap_approach_id).to.equal(2);
                    expect(apmap.apmap_approach_desc).to.equal('Test Approach');
                    done();
                });
        });
    });

    /*
      describe('PATCH /api/apmaps/:id', function() {
        var patchedApmap;

        beforeEach(function(done) {
          request(app)
            .patch(`/api/apmaps/${newApmap._id}`)
            .send([
              { op: 'replace', path: '/name', value: 'Patched Apmap' },
              { op: 'replace', path: '/info', value: 'This is the patched apmap!!!' }
            ])
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if(err) {
                return done(err);
              }
              patchedApmap = res.body;
              done();
            });
        });

        afterEach(function() {
          patchedApmap = {};
        });

        it('should respond with the patched apmap', function() {
          expect(patchedApmap.name).to.equal('Patched Apmap');
          expect(patchedApmap.info).to.equal('This is the patched apmap!!!');
        });
      });
    */
    describe('DELETE /api/apmaps/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/apmaps/${newApmap._id}`)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when apmap does not exist', function(done) {
            request(app)
                .delete(`/api/apmaps/${newApmap._id}`)
                .expect(404)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });
});
