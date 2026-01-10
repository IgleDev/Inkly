import jwt from "jsonwebtoken"
import { Types } from "mongoose";

interface iUserPayload {
    id : Types.ObjectId
}

export const generateJWT = (payload : iUserPayload) => {
    const data = { payload };
    const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn : '180d'
    })
    return token;
}