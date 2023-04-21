import mongoose, { Schema } from 'mongoose';
import { IGenderDB, IGenderDocument } from './types';


const GenderSchema = new Schema<IGenderDB>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IGenderDocument>('Gender', GenderSchema);
