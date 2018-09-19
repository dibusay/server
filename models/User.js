const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaUser = new Schema({
    userName:{
        type: String
    },
    email:{
        type: String
    },
    userId:{
        type: String
    },
    favorites: [{
        type: Schema.Types.ObjectId, ref: 'Favorite'
    }]
},{
    timestamps:
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const User = mongoose.model('User', schemaUser)

module.exports = User