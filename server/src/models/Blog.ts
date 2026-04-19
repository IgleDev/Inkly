import mongoose, { Schema } from "mongoose";
import { tBlogClass } from "../types";

export const BlogSchema = new Schema ({
    title : { 
        type : String, 
        required : true 
    },
    description : {
        type : String,
    },
    tags : [{
        type : String
    }],
    owner : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    published: { 
        type: Boolean, 
        default: false 
    },
    reg : {
        type : String,
    }
}, { timestamps : true });

const Blog = mongoose.model<tBlogClass>('Blog', BlogSchema);
export default Blog;