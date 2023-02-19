import mongoose, {Schema, model, Types} from "mongoose";
import {IRoleDB, IRoleDocument} from "./types";


const RoleSchema = new Schema<IRoleDB>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

export default mongoose.model<IRoleDocument>('Role', RoleSchema);
