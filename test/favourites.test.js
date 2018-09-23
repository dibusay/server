const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Favourites', function() {
  it('should add a favourite to User /favourites POST', function(done) {
    this.timeout(2000)
    chai.request(server)
      .post('/favourites')
      .send({
        label: "Oyako Donburi (Japanese Chicken & Egg Bowl)",
        image: "https://www.edamam.com/web-img/c64/c64153cdcaef7c25b1d86352d5d43708.JPG",
        ingredientLines: [
          "1/2 boneless chicken breast, cut into bite sized chunks",
					"1/2 onion, sliced",
					"3 eggs, beaten",
					"3 ounces \"tsyuyu\" noodle dipping sauce (sold as bottled concentrate in asian food stores), mixed with 3 ounces of water",
					"3 scallions, sliced thinly",
					"1 cup cooked japanese \"sushi\" rice"
        ],
        calories: 1402.0965064000002,
        totalTime: 137.0,
        uid: 23456
      })
      .end(function(err, res) {
        if (err) throw new Error(err)
        res.should.have.status(200)
        // res.should.be.a('object')
        // res.body.should.have.property('msg')
        // res.body.should.have.property('favourite')
        // res.body.favourite.should.be.a('object')
        // res.body.favourite.should.have.property('_id')
        // res.body.favourite.should.have.property('label')
        // res.body.favourite.should.have.property('image')
        // res.body.favourite.should.have.property('ingredientLines')
        // res.body.favourite.should.have.property('calories')
        // res.body.favourite.should.have.property('totalTime')
        // res.body.favourite.should.have.property('createdAt')
        // res.body.favourite.should.have.property('updatedAt')
        done()
      })
  })


  it('should list all favourites on /favourites GET', function(done) {
    chai.request(server)
      .get('/favourites')
      .end(function(err, res) {
        if (err) throw new Error(err)
        res.should.have.status(200);
        res.body.should.have.property('msg')
        res.body.should.have.property('favourites')
        res.body.favourites.should.be.a('array')
        res.body.favourites[0].should.have.property('_id')
        res.body.favourites[0].should.have.property('label')
        res.body.favourites[0].should.have.property('image')
        res.body.favourites[0].should.have.property('ingredientLines')
        res.body.favourites[0].should.have.property('calories')
        res.body.favourites[0].should.have.property('totalTime')
        res.body.favourites[0].should.have.property('createdAt')
        res.body.favourites[0].should.have.property('updatedAt')
        done()
      })
  })

  it('should get a single favourite on /favourites/:id GET', function(done) {
    chai.request(server)
      .get('/favourites/'+'5ba2f4a219a2ad28b41004a7')
      .end(function(err, res) {
        if (err) throw new Error(err)
      
        res.should.have.status(200);
        res.body.should.have.property('msg')
        res.body.should.have.property('favourite')
        // res.body.favourite.should.be.a('object')
        // res.body.favourite.should.have.property('_id')
        // res.body.favourite.should.have.property('label')
        // res.body.favourite.should.have.property('image')
        // res.body.favourite.should.have.property('ingredientLines')
        // res.body.favourite.should.have.property('calories')
        // res.body.favourite.should.have.property('totalTime')
        // res.body.favourite.should.have.property('createdAt')
        // res.body.favourite.should.have.property('updatedAt')
        done()
      })
  })

  it('should delete favourite on /favourites/:id DELETE', function(done) {
    this.timeout(2000)
    chai.request(server)
      .delete('/favourites/'+'5ba2f4a219a2ad28b41004a7')
      .send({uid: 12345})
      .end(function(err, res) {
        if (err) throw new Error(err)
        res.should.have.status(200)
        res.should.be.a('object')
        res.body.should.have.property('msg')
        res.body.favourite.should.be.a('object')
        res.body.favourite.should.have.property('userName')
        res.body.favourite.should.have.property('favourites')
        done()
      })
  })

  it('should FAIL to get a single favourite on /favourites/:id GET', function(done) {
    this.timeout(4000)
    chai.request(server)
      .get('/favourites/'+'0942tum90aowuhg2')
      .end(function(err, res) {
        if (err) throw new Error(err)
        res.should.have.status(400);
        res.should.be.a('object')
        res.body.should.have.property('msg')
        // res.body.favourite.should.have.property('_id')
        res.body.should.have.property('error')
        done()
      })
  })

})