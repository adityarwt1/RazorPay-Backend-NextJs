import { connectMongoDb } from "@/lib/mongodbConnection";
import Order from "@/models/orders";
import { badRequest, HttpStatusCode, internalServerIssue } from "@/utils/apiResponses";
import { apiAndSecretValidation } from "@/utils/secretValidatoin/secretValidatoin";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest):Promise<NextResponse> {
    try {
        // api authentication
        const isValidSchema = await apiAndSecretValidation(req)
        // bad requust condition 
        if(!isValidSchema.isValid){
            return badRequest(isValidSchema.error || "bad request!")
        }
        // creatin order
        if(!isValidSchema.amount){
            return badRequest("amount provided!")
        }
        const isConnected = await connectMongoDb()

        if(!isConnected){
            return internalServerIssue(new Error("Failed to connect database!"))
        }
        const order = await Order.create({
            amount:isValidSchema.amount,
            merchantId:isValidSchema.authorId
        })
        // order
        if(!order){ 
            return internalServerIssue(new Error("Failed to create order!"))
        }
        return NextResponse.json({
            success:true,
            status:HttpStatusCode.CREATED,
            orderId:`order_${order._id}`,
            message:"Order create successfully!"
        },{
            status:HttpStatusCode.CREATED
        })
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }
    
}