'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cpmapCtrlStub = {
    index: 'cpmapCtrl.index',
    show: 'cpmapCtrl.show',
    create: 'cpmapCtrl.create',
    upsert: 'cpmapCtrl.upsert',
    patch: 'cpmapCtrl.patch',
    destroy: 'cpmapCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var cpmapIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './cpmap.controller': cpmapCtrlStub
});

describe('cpmap API Router:', function() {
    it('should return an express router instance', function() {
        expect(cpmapIndex).to.equal(routerStub);
    });

    describe('GET /api/cpmaps', function() {
        it('should route to cpmap.controller.index', function() {
            expect(routerStub.get
                .withArgs('/', 'cpmapCtrl.index')
            ).to.have.been.calledOnce;
        });
    });

    describe('GET /api/cpmaps/:id', function() {
        it('should route to cpmap.controller.show', function() {
            expect(routerStub.get
                .withArgs('/:id', 'cpmapCtrl.show')
            ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/cpmaps', function() {
        it('should route to cpmap.controller.create', function() {
            expect(routerStub.post
                .withArgs('/', 'cpmapCtrl.create')
            ).to.have.been.calledOnce;
        });
    });

    describe('PUT /api/cpmaps/:id', function() {
        it('should route to cpmap.controller.upsert', function() {
            expect(routerStub.put
                .withArgs('/:id', 'cpmapCtrl.upsert')
            ).to.have.been.calledOnce;
        });
    });

    describe('PATCH /api/cpmaps/:id', function() {
        it('should route to cpmap.controller.patch', function() {
            expect(routerStub.patch
                .withArgs('/:id', 'cpmapCtrl.patch')
            ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/cpmaps/:id', function() {
        it('should route to cpmap.controller.destroy', function() {
            expect(routerStub.delete
                .withArgs('/:id', 'cpmapCtrl.destroy')
            ).to.have.been.calledOnce;
        });
    });
});
