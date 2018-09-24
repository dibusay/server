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
                res.body.recipes[0].should.have.property('uri')
                res.body.recipes[0].should.have.property('label')
                res.body.recipes[0].should.have.property('image')
                res.body.recipes[0].should.have.property('ingredientLines')
                res.body.recipes[0].should.have.property('calories')
                res.body.recipes[0].should.have.property('totalTime')
                done();
            })
    })
    it('should return status 404 if route is not exactly "/recipes', function(done){
        this.timeout(10000);
        chai.request(server)
            .get("/recipe")
            .end(function(err, res){
                res.should.have.status(404);
                done();
            })
    })

    it('should return status 404 if route excludes query', function(done){
        this.timeout(10000);
        chai.request(server)
            .get("/recipes/banana")
            .end(function(err, res){
                res.should.have.status(404);
                done();
            })
    })

    it('should return status 500 if error', function(done){
        this.timeout(10000);
        chai.request(server)
            .get("/recipes?q=['salak']")
            .end(function(err, res){
                res.should.have.status(500)
                done();
            })
    })
})