const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaUser = new Schema({
    userName:{
        type: String,
        required: [true, "username is require"]
    },
    email:{
        type: String
    },
    userId:{
        type: String
    },
    favourites: [{
        type: Schema.Types.ObjectId, ref: 'Favourite'
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