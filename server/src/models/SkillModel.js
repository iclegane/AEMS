const { Schema, model } = require('mongoose');


const SkillSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Skill', SkillSchema);
