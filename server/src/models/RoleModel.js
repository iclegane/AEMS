const { Schema, model } = require('mongoose');


const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Role', RoleSchema);
