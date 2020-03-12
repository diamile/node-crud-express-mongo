const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    fullName:{
        type:String,
         required:true
    },

    email:{
        type:String,
         required:true
    }
});

module.exports = mongoose.model('Post',PostSchema);