import mongoose, {Schema, model, Types} from "mongoose";
import {ISkillDB, ISkillDocument} from "./types";


const SkillSchema = new Schema<ISkillDB>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});


export default mongoose.model<ISkillDocument>('Skill', SkillSchema);
