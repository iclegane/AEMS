import mongoose, { Schema } from 'mongoose';
import { IEmploymentDB, IEmploymentDocument } from './types';


const EmploymentSchema = new Schema<IEmploymentDB>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IEmploymentDocument>('Employment', EmploymentSchema);
