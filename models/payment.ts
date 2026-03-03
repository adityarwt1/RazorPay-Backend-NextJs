import mongoose, { Schema } from "mongoose";

interface PaymentInterface{
    orderId:mongoose.Types.ObjectId,
    authorId:mongoose.Types.ObjectId,
    amount:number,
    razorPaySignature:string,
    paymentId:string
}

const PyamentSchema :Schema<PaymentInterface>  = new Schema({
    orderId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    authorId:{
        type:Schema.Types.ObjectId,
        required:true
    },  
    amount:{
        type:Number,
        required:true
    },
    razorPaySignature:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
    }
},{
    timestamps:true
})

const Payment = mongoose.models.Payment || mongoose.model<PaymentInterface>("Payment", PyamentSchema)
export default Payment