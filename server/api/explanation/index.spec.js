'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var explanationCtrlStub = {
    index: 'explanationCtrl.index',
    show: 'explanationCtrl.show',
    create: 'explanationCtrl.create',
    upsert: 'explanationCtrl.upsert',
    patch: 'explanationCtrl.patch',
    destroy: 'explanationCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var explanationIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './explanation.controller': explanationCtrlStub
});

describe('explanation API Router:', function() {
    it('should return an express router instance', function() {
        expect(explanationIndex).to.equal(routerStub);
    });

    describe('GET /api/explanations', function() {
        it('should route to explanation.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'explanationCtrl.index')
            ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/explanations/:id', function() {
        it('should route to explanation.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'explanationCtrl.show')
            ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/explanations', function() {
        it('should route to explanation.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'explanationCtrl.create')
            ).to.have.been.calledOnce;
        });
    });

    describe('PUT /api/explanations/:id', function() {
        it('should route to explanation.controller.upsert', function() {
            expect(routerStub.put
                .withArgs('/:id', 'explanationCtrl.upsert')
            ).to.have.been.calledOnce;
        });
    });

    describe('PATCH /api/explanations/:id', function() {
        it('should route to explanation.controller.patch', function() {
            expect(routerStub.patch
                .withArgs('/:id', 'explanationCtrl.patch')
            ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/explanations/:id', function() {
        it('should route to explanation.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'explanationCtrl.destroy')
            ).to.have.been.calledOnce;
        });
    });
});
