import mongoose, { Document, Schema } from "mongoose";

interface UserDocumentInterface extends Document{
    fullName:string,
    phoneNumber:number,
    email:string,
    merchantId:string,
    password:string
    authToken:string
}

const UserSchema:Schema<UserDocumentInterface > = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    merchantId:{
        type:String
    },
    authToken:{
        type:String,
        required:false
    }
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model<UserDocumentInterface>("User", UserSchema)
export default User