import mongoose, { Schema } from "mongoose";

interface ServicesInterface {
    title:string,
    secretKey:string
    apiKey:string
    authorId:mongoose.Types.ObjectId
    available:boolean
}

const ServicesSchema:Schema<ServicesInterface> = new Schema({
    title:{
        type:String,
        required:true
    },
    secretKey:{
        type:String,
        required:true
    },
    apiKey:{
        type:String,
        required:true
    },
    authorId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
})

const Service = mongoose.models.Service || mongoose.model<ServicesInterface>("Service", ServicesSchema)
export default Service