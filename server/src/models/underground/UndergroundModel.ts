import mongoose, {Schema} from 'mongoose';
import {IUndergroundDB, IUndergroundDocument} from './types';


const UndergroundSchema = new Schema<IUndergroundDB>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IUndergroundDocument>('Underground', UndergroundSchema);
