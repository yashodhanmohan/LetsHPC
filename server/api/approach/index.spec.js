'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var apmapCtrlStub = {
    index: 'apmapCtrl.index',
    show: 'apmapCtrl.show',
    create: 'apmapCtrl.create',
    upsert: 'apmapCtrl.upsert',
    patch: 'apmapCtrl.patch',
    destroy: 'apmapCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var apmapIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './apmap.controller': apmapCtrlStub
});

describe('apmap API Router:', function() {
    it('should return an express router instance', function() {
        expect(apmapIndex).to.equal(routerStub);
    });

    describe('GET /api/apmaps', function() {
        it('should route to apmap.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'apmapCtrl.index')
            ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/apmaps/:id', function() {
        it('should route to apmap.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'apmapCtrl.show')
            ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/apmaps', function() {
        it('should route to apmap.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'apmapCtrl.create')
            ).to.have.been.calledOnce;
        });
    });

    describe('PUT /api/apmaps/:id', function() {
        it('should route to apmap.controller.upsert', function() {
            expect(routerStub.put
                .withArgs('/:id', 'apmapCtrl.upsert')
            ).to.have.been.calledOnce;
        });
    });

    describe('PATCH /api/apmaps/:id', function() {
        it('should route to apmap.controller.patch', function() {
            expect(routerStub.patch
                .withArgs('/:id', 'apmapCtrl.patch')
            ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/apmaps/:id', function() {
        it('should route to apmap.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'apmapCtrl.destroy')
            ).to.have.been.calledOnce;
        });
    });
});
