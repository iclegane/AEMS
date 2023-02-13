const { Schema, model } = require('mongoose');


const UndergroundSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Underground', UndergroundSchema);
