const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    name: {
        type: String,
        default: null,
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
        default: null
    },
    work_date: {
        type: Date,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    vacation_count: {
        type: Number,
        default: null
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default: null
    },
    gender_id: {
        type: Schema.Types.ObjectId,
        ref: 'Gender',
        default: null
    },
    underground_id: {
        type: Schema.Types.ObjectId,
        ref: 'Underground',
        default: null
    },
    employment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employment',
        default: null
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    skill_ids: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
        default: []
    }
});

module.exports = model('User', UserSchema);
