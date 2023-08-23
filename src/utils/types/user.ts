import { ObjectId } from "mongoose";

export type UserBasicType = {
    id: ObjectId;
    name: string;
    email: string;
    username?: string;
    image?: string;
}