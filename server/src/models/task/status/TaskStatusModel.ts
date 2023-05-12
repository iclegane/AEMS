import mongoose, { Schema } from 'mongoose';
import { ITaskStatusDB, ITaskStatusDocument } from './types';


const TaskStatusSchema = new Schema<ITaskStatusDB>({
    name: {
        type: String,
        required: true,
    }
});


export default mongoose.model<ITaskStatusDocument>('TaskStatus', TaskStatusSchema);
