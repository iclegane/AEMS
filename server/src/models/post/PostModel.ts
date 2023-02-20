import mongoose, {Schema} from 'mongoose';
import {IPostDocument, IPostDB} from './types';


const PostSchema = new Schema<IPostDB>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IPostDocument>('Post', PostSchema);
