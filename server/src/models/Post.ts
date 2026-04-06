import mongoose, { Schema } from "mongoose";
import { tBlogClass, tPostClass } from "../types";

export const PostSchema = new Schema ({
    title : {
        type : String,
        required : true
    },
    blocks:  [
        {
          type:  { type: String, enum: ['paragraph', 'heading', 'image', 'video', 'quote'], required: true },
          value: { type: String, required: true },
          order: { type: Number, required: true }
        }
    ],
    tags : [{
        type : String
    }],
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

const Post = mongoose.model<tPostClass>('Post', PostSchema)