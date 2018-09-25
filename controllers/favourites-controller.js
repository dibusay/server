const Favourite = require('../models/Favourites')
const User = require('../models/User')

const getAll = function(req, res) {
  Favourite.find({})
  .then(favourites => {
    res.status(200).json({
      msg: 'Get all favourites',
      favourites
    })
  })
  .catch(err => {
    res.status(400).json({
      msg: 'Failed to get all favourites',
      error: err
    })
  })
}

const getById = function(req, res) {
  const { id } = req.params
  Favourite.find({ _id: id })
  .then(favourite => {
    res.status(200).json({
      msg: 'Get a favourite',
      favourite
    })
  })
  .catch(err => {
    res.status(400).json({
      msg: 'Failed to get a favourite',
      error: err
    })
  })
}


const addToUser = function(req, res) {
  const {
    label, image, ingredientLines, calories, totalTime, uid
  } = req.body

  const search = { label: label }
  if (image) search.image = image

  Favourite.findOne(search)
  .then(foundItem => {
    if (foundItem) {
      User.findOne({
        userId: uid
      })
      .then(found => {
        let favArr = found.favourites
        if (favArr.indexOf(foundItem._id) !== -1) {
          return res.status(400).json({
            msg: 'You cannot add the same item',
          })
        }
        User.findOneAndUpdate({
          userId: uid,
          
        }, {
          $push: { favourites: foundItem._id }
        }, {
          new: true
        })
        .populate('favourites')
        .then(updated => {
          res.status(200).json({
            msg: 'Favourite found and added to user favourites',
            favourite: updated
          })
        })
        .catch(err => {
          res.status(400).json({
            msg: 'error add favourites',
            error: err
          })
        })
      })
      .catch(err => {
        res.status(400).json({
          msg: 'error add favourites',
          error: err
        })
      })

    }
    else {
      console.log('create new collection')
      Favourite.create({
        label, image, ingredientLines, calories, totalTime
      })
      .then(favourite => {
        User.findOneAndUpdate({
          userId: uid
        }, {
          $push: { favourites: favourite._id }
        }, {
          new: true
        })
        .populate('favourites')
        .then(updated => {
          if(updated===null){
            res.status(400).json({
              msg: 'Failed to add a favourite to user',
              error: err
            })
          }
          else{
            res.status(200).json({
              msg: 'Favourite created and added to user favourites',
              favourite: updated
            })
          }
        })
        .catch(err=>{
          res.status(400).json({
            msg: 'Failed to add a favourite to user',
            error: err
          })
        })
      })
    }
  })
  .catch(err => {
    res.status(400).json({
      msg: 'Error add favourites',
      error: err
    })
  })
}

const removeFromUser = function(req, res) {
  let { uid } = req.body
  let { id } = req.params

  User.findOneAndUpdate({
    userId: uid
  }, {
    $pull: { favourites: id }
  }, {
    new: true
  })
  .populate('favourites')
  .then(updated => {
    res.status(200).json({
      msg: 'Favourite removed from user',
      favourite: updated
    })
  })
  .catch(err => {
    res.status(400).json({
      msg: 'Error removing favourite from user',
      error: err
    })
  })
}


module.exports = {
  getAll, getById, addToUser, removeFromUser
}