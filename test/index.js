const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp)

describe('/', function(){
    it('should return status 200 and a welcome message', function(done){
        chai.request(server)
            .get("/")
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.equal('Welcome to masakYuk!');
                done();
            })
    })
})
