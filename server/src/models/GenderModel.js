const { Schema, model } = require('mongoose');


const GenderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Gender', GenderSchema);
