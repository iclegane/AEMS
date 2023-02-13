const { Schema, model } = require('mongoose');


const PostSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Post', PostSchema);
