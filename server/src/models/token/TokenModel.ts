import mongoose, { Schema } from 'mongoose';
import { ITokenDB, ITokenDocument } from './types';


const TokenSchema = new Schema<ITokenDB>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    }
});

export default mongoose.model<ITokenDocument>('Token', TokenSchema);
