import mongoose, { Schema } from 'mongoose';
import { ITaskDB, ITaskDocument } from './types';


const TaskSchema = new Schema<ITaskDB>({
    name: {
       type: String,
       required: true,
    },
    description: {
        type: String,
        required: true,
        default: null,
    },
    body: {
        type: String,
        required: true,
        default: null,
        trim: true,
    },
    deadline: {
        type: Date,
        required:true,
    },
    performer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'TaskStatus',
        required: true
    }
},{
    timestamps: true
});


export default mongoose.model<ITaskDocument>('Task', TaskSchema);
