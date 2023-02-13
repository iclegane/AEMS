const { Schema, model } = require('mongoose');


const EmploymentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Employment', EmploymentSchema);
