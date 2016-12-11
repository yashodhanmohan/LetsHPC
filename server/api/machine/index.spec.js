'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var machineCtrlStub = {
  index: 'machineCtrl.index',
  show: 'machineCtrl.show',
  create: 'machineCtrl.create',
  upsert: 'machineCtrl.upsert',
  patch: 'machineCtrl.patch',
  destroy: 'machineCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var machineIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './machine.controller': machineCtrlStub
});

describe('machine API Router:', function() {
  it('should return an express router instance', function() {
    expect(machineIndex).to.equal(routerStub);
  });

  describe('GET /api/machines', function() {
    it('should route to machine.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'machineCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/machines/:id', function() {
    it('should route to machine.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'machineCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/machines', function() {
    it('should route to machine.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'machineCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/machines/:id', function() {
    it('should route to machine.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'machineCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/machines/:id', function() {
    it('should route to machine.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'machineCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/machines/:id', function() {
    it('should route to machine.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'machineCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
