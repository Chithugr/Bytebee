const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
        unique: true
      },
    title:{
        type: String,
        required: true,
    },
    description:{ 
        type:String,
        required: true,
    },
    
  }
)

module.exports = mongoose.model('Post', postSchema);