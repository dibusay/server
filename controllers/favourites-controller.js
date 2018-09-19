const Favourite = require('../models/Favourites')

const getAll = function(req, res) {
  Favourite.find({})
  .then(favourites => {
    res.send(200).json({
      msg: 'Get all favourites',
      favourites
    })
  })
  .catch(err => {
    res.send(400).json({
      msg: 'Failed to get all favourites',
      error: err
    })
  })
}

const getById = function(req, res) {
  const { id } = req.params
  Favourite.find({ _id: id })
  .then(favourite => {
    res.send(200).json({
      msg: 'Get a favourite',
      favourite
    })
  })
  .catch(err => {
    res.send(400).json({
      msg: 'Failed to get a favourite',
      error: err
    })
  })
}

const create = function(req, res) {
  const {
    label, image, ingredientLines, calories, totalTime, uuid
  } = req.body

  Favourite.findOne({ label, image })
  .then(foundItem => {
    if (foundItem) {
      User.findOneAndUpdate({
        uuid: uuid
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
      Favourite.create({
        label, image, ingredientLines, calories, totalTime
      })
      .then(favourite => {
        User.findOneAndUpdate({ 
          uuid: uuid
        }, {
          $push: { favourites: foundItem._id }
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
    res.send(400).json({
      msg: 'Error add favourites',
      error: err
    })
  })
}

const removeFromUser = function(req, res) {
  let { uuid } = req.body
  let { id } = req.params

  User.findOneAndUpdate({
    uuid: uuid
  }, {
    $pull: { favourite: id }
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
  getAll, getById, create, removeFromUser, remove
}