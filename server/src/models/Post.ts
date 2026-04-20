import mongoose, { Schema } from "mongoose";
import { tPostClass } from "../types";

export const PostSchema = new Schema ({
    blocks:  [
        {
          type:  { type: String, enum: ['paragraph', 'heading', 'image', 'video', 'quote'], required: true },
          value: { type: Schema.Types.Mixed, required: true },
          description : { type : String },
          order: { type: Number, required: true }
        }
    ],
    blog : {
        type : Schema.Types.ObjectId, 
        ref : 'Blog', 
        required : true,
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
}, { timestamps : true });

const Post = mongoose.model<tPostClass>('Post', PostSchema);
export default Post;