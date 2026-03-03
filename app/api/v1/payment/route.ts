import { connectMongoDb } from "@/lib/mongodbConnection";
import { badRequest, internalServerIssue } from "@/utils/apiResponses";
import { apiAndSecretValidation } from "@/utils/secretValidatoin/secretValidatoin";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import Payment from "@/models/payment";
export async function POST(req:NextRequest):Promise<NextResponse> {
    try {
        // api authen4tication 
        const isValid = await apiAndSecretValidation(req)

        if(!isValid || !isValid.authorId){
            return badRequest("apikey and secret not provided properly!")
        }
        // orderid not found error 
        if(!isValid.data?.orderId){
            return badRequest('order id must be provided!')
        }
        // database connection 
        const isConected = await connectMongoDb()
        if(!isConected){
            return internalServerIssue(new Error("failed to connect database!"))
        }
        // generate hext of it
        const hashData = {
            orderId:isValid.data?.orderId,
            amount:isValid.data.amount
        }
        const razorPaySignature = crypto.
        createHash('sha256')
        .update(JSON.stringify(hashData))
        .digest("hex")
        
        // consta creating payemtn
        const payment = await Payment.create({
            orderId:isValid.data.orderId,
            authorId:isValid.authorId,
            amount:isValid.data.amount,
            razorPaySignature:razorPaySignature
        })

        // if bychance failed tto create pament
        if(!payment){
            return internalServerIssue(new Error("Failed to make payment!"))
        }
        // saving paymennt id
        payment.paymentId = `paymentId_${payment._id}`
        await payment.save()
        return NextResponse.json({
            success:true,
            message:"payment successfull!",
            amount:isValid.data.amount,
            orderId:isValid.data.orderId,
            razorPaySignature
        })
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }
}