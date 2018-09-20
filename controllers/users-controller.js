const Users = require('../models/User.js')

class User{
    static AddUser( req, res ){
        Users.findOne({
            userId: req.body.userId
        })
        .then(user=>{
            console.log("testing");
            
            if(user){
                res.status(201).json(user)
            }
            else{
                Users.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    userId: req.body.userId
                })
                .then(newuser=>{
                    res.status(201).json(newuser)
                })
                .catch(err=>{
                    res.status(401).json({ msg: err })
                })
            }
        })
        .catch(err=>{
            res.status(401).json({ msg: err })
        })
    }
    static FindUser( req, res ){
        console.log(req.params.uid)
        Users.findOne({
            userId: req.params.uid
        })
        .populate('favourites')
        .then( user=>{
            res.status(201).json(user)
        })
        .catch( err =>{
            res.status(401).json({ msg: err })            
        })
    }
}

module.exports = User