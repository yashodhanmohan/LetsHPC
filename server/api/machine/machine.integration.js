'use strict';

var app = require('../..');
import request from 'supertest';

var newMachine;

describe('Machine API:', function() {
    describe('GET /api/machines', function() {
        var machines;

        beforeEach(function(done) {
            request(app)
                .get('/api/machines')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    machines = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            expect(machines).to.be.instanceOf(Array);
        });
    });

    describe('POST /api/machines', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/machines')
                .send({
                    machine_id: 1,
                    machine_file: 'cluster 1'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newMachine = res.body;
                    done();
                });
        });

        it('should respond with the newly created machine', function() {
            expect(newMachine.machine_id).to.equal(1);
            expect(newMachine.machine_file).to.equal('cluster 1');
        });
    });

    describe('GET /api/machines/:id', function() {
        var machine;

        beforeEach(function(done) {
            request(app)
                .get(`/api/machines/${newMachine._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    machine = res.body;
                    done();
                });
        });

        afterEach(function() {
            machine = {};
        });

        it('should respond with the requested machine', function() {
            expect(machine.machine_id).to.equal(1);
            expect(machine.machine_file).to.equal('cluster 1');

        });
    });

    describe('PUT /api/machines/:id', function() {
        var updatedMachine;

        beforeEach(function(done) {
            request(app)
                .put(`/api/machines/${newMachine._id}`)
                .send({
                    machine_file: 'cluster 10'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedMachine = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedMachine = {};
        });

        it('should respond with the original machine', function() {
            expect(updatedMachine.machine_id).to.equal(1);
            expect(updatedMachine.machine_file).to.equal('cluster 1');
        });

        it('should respond with the updated machine on a subsequent GET', function(done) {
            request(app)
                .get(`/api/machines/${newMachine._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    let machine = res.body;
                    expect(machine.machine_id).to.equal(1);
                    expect(machine.machine_file).to.equal('cluster 10');
                    done();
                });
        });
    });

    /*
      describe('PATCH /api/machines/:id', function() {
        var patchedMachine;

        beforeEach(function(done) {
          request(app)
            .patch(`/api/machines/${newMachine._id}`)
            .send([
              { op: 'replace', path: '/name', value: 'Patched Machine' },
              { op: 'replace', path: '/info', value: 'This is the patched machine!!!' }
            ])
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if(err) {
                return done(err);
              }
              patchedMachine = res.body;
              done();
            });
        });

        afterEach(function() {
          patchedMachine = {};
        });

        it('should respond with the patched machine', function() {
          expect(patchedMachine.name).to.equal('Patched Machine');
          expect(patchedMachine.info).to.equal('This is the patched machine!!!');
        });
      });
    */
    describe('DELETE /api/machines/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/machines/${newMachine._id}`)
                .expect(204)
                .end(err => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when machine does not exist', function(done) {
            request(app)
                .delete(`/api/machines/${newMachine._id}`)
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
