// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image: string;
    username: string;
    ownedChannels: mongoose.Types.ObjectId[];
    managedChannels: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    ownedChannels: [{ type: Schema.Types.ObjectId, ref: 'YoutubeChannel' }],
    managedChannels: [{ type: Schema.Types.ObjectId, ref: 'YoutubeChannel' }],
});

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', userSchema);



export default UserModel;
