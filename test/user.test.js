var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app')
let User = require('../models/User')

chai.use(chaiHttp)

describe("Users",function(){
    it('should get a user on /users',function(done){
        chai.request(server)
            .post('/users')
            .send({
                "userName":"rhesautomo",
                "email":"rhesa@mail.com",
                "userId":"23456"
            })
            .end(function(err, res){
                res.body.should.be.a('object')
                res.body.should.have.property('userName');
                res.body.should.have.property('email');            
                res.body.should.have.property('_id');
                res.body.should.have.property('userId');
                res.body.should.have.property('favourites');

                res.body.userName.should.equal('rhesautomo')
                res.body.email.should.equal('rhesa@mail.com')
                res.body.userId.should.equal('23456')

                res.body.userName.should.be.a('string')
                res.body.email.should.be.a('string')
                res.body.userId.should.be.a('string')
                res.body.favourites.should.be.a('array')

                res.should.have.status(201)
                done()
            })
    })

    it('should create new user on /users',function(done){
        chai.request(server)
            .post('/users')
            .send({
                "userName":"rhesautomo",
                "email":"rhesa@mail.com",
                "userId":"12345678"
            })
            .end(function(err, res){
                res.body.should.be.a('object')
                res.body.should.have.property('userName');
                res.body.should.have.property('email');            
                res.body.should.have.property('_id');
                res.body.should.have.property('userId');
                res.body.should.have.property('favourites');

                res.body.userName.should.equal('rhesautomo')
                res.body.email.should.equal('rhesa@mail.com')
                res.body.userId.should.equal('12345678')

                res.body.userName.should.be.a('string')
                res.body.email.should.be.a('string')
                res.body.userId.should.be.a('string')
                res.body.favourites.should.be.a('array')
                res.should.have.status(201)
                done()
            })
    })










    it('should get status 401 on /users if username null',function(done){
        chai.request(server)
            .post('/users')
            .send({
                "userName":undefined,
                "email":"rhesa@mail.com",
                "userId":"88888"
            })
            .end(function(err, res){
                // console.log(res.body);
                
                res.should.have.status(401)
                res.body.should.have.property('msg');
                done()
            })
    })

    














    it('should get user /users/:uid',function(done){
        chai.request(server)
            .get('/users/23456')
            .end(function(err, res){
                res.body.should.be.a('object')
                res.body.should.have.property('userName');
                res.body.should.have.property('email');            
                res.body.should.have.property('_id');
                res.body.should.have.property('userId');
                res.body.should.have.property('favourites');
            
                res.body.userName.should.be.a('string')
                res.body.email.should.be.a('string')
                res.body.userId.should.be.a('string')
                res.body.favourites.should.be.a('array')

                res.should.have.status(201)
                done()
            })
    })


    it('should get status 401 on /users/:uid if uid null',function(done){
        chai.request(server)
            .get('/users/'+null)
            .end(function(err, res){
                res.should.have.status(401)
                done()
            })
    })
})
