const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    emailActivationLink: {
        type: String,
    },
    birth_date: {
        type: Date,
    },
    work_date: {
        type: Date,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    vacation_count: {
        type: Number,
    },
    gender_id: {
        type: Number,
        default: null
    },
    metro_id: {
        type: Number,
        default: null
    },
    employment_id: {
        type: Number,
        default: null,
    },
    post_id: {
        type: Number,
        default: null
    },
    skill_ids: {
        type: [Number],
        default: []

    }
});

module.exports = model('User', UserSchema);
