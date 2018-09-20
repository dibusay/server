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
      console.log('found', foundItem)
      User.findOneAndUpdate({
        userId: uid
      }, {
        $push: { favourites: foundItem._id }
      }, {
        new: true
      })
      .then(updated => {
        console.log(updated)
        res.status(200).json({
          msg: 'Favourite found and added to user favourites',
          favourite: foundItem
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
        .then(updated => {
          console.log(updated)
          res.status(200).json({
            msg: 'Favourite created and added to user favourites',
            favourite
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
  .then(updated => {
    res.status(200).json({
      msg: 'Favourite removed from user',
      updated
    })
  })
  .catch(err => {
    res.status(400).json({
      msg: 'Error removing favourite from user',
      error: err
    })
  })
}

const remove = function(req, res) {
  let { id } = req.params
  Favourite.findOneAndRemove({ _id: id })
  .then(removed => {
    res.status(200).json({
      msg: 'Favourite removed from collection',
      removed
    })
  })
  .catch(err => {
    res.status(400).json({
      msg: 'Error removing favourite from DB',
      error: err
    })
  })
}

module.exports = {
  getAll, getById, addToUser, removeFromUser, remove
}