'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var problemCtrlStub = {
    index: 'problemCtrl.index',
    show: 'problemCtrl.show',
    create: 'problemCtrl.create',
    upsert: 'problemCtrl.upsert',
    patch: 'problemCtrl.patch',
    destroy: 'problemCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var problemIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './problem.controller': problemCtrlStub
});

describe('problem API Router:', function() {
    it('should return an express router instance', function() {
        expect(problemIndex).to.equal(routerStub);
    });

    describe('GET /api/problems', function() {
        it('should route to problem.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'problemCtrl.index')
            ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/problems/:id', function() {
        it('should route to problem.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'problemCtrl.show')
            ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/problems', function() {
        it('should route to problem.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'problemCtrl.create')
            ).to.have.been.calledOnce;
        });
    });

    describe('PUT /api/problems/:id', function() {
        it('should route to problem.controller.upsert', function() {
            expect(routerStub.put
                .withArgs('/:id', 'problemCtrl.upsert')
            ).to.have.been.calledOnce;
        });
    });

    describe('PATCH /api/problems/:id', function() {
        it('should route to problem.controller.patch', function() {
            expect(routerStub.patch
                .withArgs('/:id', 'problemCtrl.patch')
            ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/problems/:id', function() {
        it('should route to problem.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'problemCtrl.destroy')
            ).to.have.been.calledOnce;
        });
    });
});
