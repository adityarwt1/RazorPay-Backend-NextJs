import mongoose, { Schema } from "mongoose";

interface OrderInterface {
    merchantId:mongoose.Types.ObjectId | string,
    amount:number
}

const OrderSchema:Schema<OrderInterface> = new Schema({
    amount:{
        type:Number,
        required:true
    },
    merchantId:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

const Order = mongoose.models.Order || mongoose.model<OrderInterface>("Order", OrderSchema)
export default Order