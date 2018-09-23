const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp)

describe('Recipes', function(){
    it('should return status 200 and list of recipes', function(done){
        this.timeout(10000);
        chai.request(server)
            .get("/recipes")
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.should.have.property('recipes');
                res.body.recipes.should.be.a('array');
                res.body.recipes.length.should.be.equal(10);
                done();
            })
    })
})
