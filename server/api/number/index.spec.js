'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var numberCtrlStub = {
  index: 'numberCtrl.index',
  show: 'numberCtrl.show',
  create: 'numberCtrl.create',
  upsert: 'numberCtrl.upsert',
  patch: 'numberCtrl.patch',
  destroy: 'numberCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var numberIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './number.controller': numberCtrlStub
});

describe('number API Router:', function() {
  it('should return an express router instance', function() {
    expect(numberIndex).to.equal(routerStub);
  });

  describe('GET /api/numbers', function() {
    it('should route to number.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'numberCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/numbers/:id', function() {
    it('should route to number.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'numberCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/numbers', function() {
    it('should route to number.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'numberCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/numbers/:id', function() {
    it('should route to number.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'numberCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/numbers/:id', function() {
    it('should route to number.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'numberCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/numbers/:id', function() {
    it('should route to number.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'numberCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
