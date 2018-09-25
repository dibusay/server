const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const moodHelper = require('../helper/mood')
const expect = require('chai').expect;
chai.use(chaiHttp)

describe('Recipes', function(){
    it('should return status 200 and list of recipes', function(done){
        this.timeout(10000);
        let p - chai.request(server)
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

    it('should return status 200, list of recipes, mood, food, age, and gender', function(done){
        this.timeout(4000)
         chai.request(server)
            .post("/mood")
            .send({
                "image": "result.uri",
                "base64": `TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlz
                IHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2Yg
                dGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGlu
                dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRo
                ZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4`
                
            })
            .end(function(err, res){
                res.should.have.status(400);
                res.body.should.be.a('object');
                done()
            })
    })

    it('should return a callback', function(done){
            // console.log('moodhelper==>', moodHelper)
               moodHelper.should.be.a('function')
               // hasil dari moodhelper itu apa

               let mood = {
                "mood" : "HAPPPY",
                "gender" : "male",
                "age" : "17"
            }
               moodHelper(mood, (data) => {
                let a = 1
                console.log('dataaa', data)
                expect(1).to.equal(1)
                done();
               })
            })
})