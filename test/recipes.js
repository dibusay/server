const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp)

describe('Recipes', function(){
    it('should return status 200 and list of recipes', function(done){
        this.timeout(5000);
        chai.request(server)
            .get("/recipes")
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.hits.should.be.a('array');
                res.body.hits.length.should.be.equal(10);
                res.body.should.have.property('hits');
                done();
            })
    })
})
