'use strict';

var app = require('../..');
import request from 'supertest';

var newUser;

describe('User API:', function() {
  describe('GET /api/users', function() {
    var users;

    beforeEach(function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(users).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          name: 'Yashwant Keswani',
          user_id: 'yashwant',
          affiliation: 1,
          password : 'keswani',
          position : 'student'

        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created user', function() {
      expect(newUser.name).to.equal('Yashwant Keswani');
      expect(newUser.user_id).to.equal('yashwant');
      expect(newUser.affiliation).to.equal(1);
      expect(newUser.password).to.equal('keswani');
      expect(newUser.position).to.equal('student');
    });
  });

  describe('GET /api/users/:id', function() {
    var user;

    beforeEach(function(done) {
      request(app)
        .get(`/api/users/${newUser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested user', function() {
      expect(user.name).to.equal('Yashwant Keswani');
      expect(user.user_id).to.equal('yashwant');
      expect(user.affiliation).to.equal(1);
      expect(user.password).to.equal('keswani');
      expect(user.position).to.equal('student');    });
  });

  describe('PUT /api/users/:id', function() {
    var updatedUser;

    beforeEach(function(done) {
      request(app)
        .put(`/api/users/${newUser._id}`)
        .send({
          user_id: 'yash1t',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUser = {};
    });

    it('should respond with the original user', function() {
      expect(updatedUser.name).to.equal('Yashwant Keswani');
      expect(updatedUser.user_id).to.equal('yashwant');
      expect(updatedUser.affiliation).to.equal(1);
      expect(updatedUser.password).to.equal('keswani');
      expect(updatedUser.position).to.equal('student');    
});

    it('should respond with the updated user on a subsequent GET', function(done) {
      request(app)
        .get(`/api/users/${newUser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let user = res.body;

          expect(user.name).to.equal('Yashwant Keswani');
          expect(user.user_id).to.equal('yash1t');
          expect(user.affiliation).to.equal(1);
          expect(user.password).to.equal('keswani');
          expect(user.position).to.equal('student');
          done();
        });
    });
  });
/*
  describe('PATCH /api/users/:id', function() {
    var patchedUser;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/users/${newUser._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched User' },
          { op: 'replace', path: '/info', value: 'This is the patched user!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUser = {};
    });

    it('should respond with the patched user', function() {
      expect(patchedUser.name).to.equal('Patched User');
      expect(patchedUser.info).to.equal('This is the patched user!!!');
    });
  });
*/
  describe('DELETE /api/users/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/users/${newUser._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when user does not exist', function(done) {
      request(app)
        .delete(`/api/users/${newUser._id}`)
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
