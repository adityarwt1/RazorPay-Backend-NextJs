import { connectMongoDb } from "@/lib/mongodbConnection";
import User from "@/models/User";
import { badRequest, conflictError, internalServerIssue } from "@/utils/apiResponses";
import { userRegistrationValidation } from "@/zodValidations/user/userCrudValidations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest):Promise<NextResponse> {
    try {
        // body validation 
        const body = await req.json()
        const isValidRequest = userRegistrationValidation.safeParse(body)
        if(!isValidRequest.success){
            return badRequest("please provide valid request!")
        }

        // databse connection
        const isConnected = await connectMongoDb()
        // falied to connected 
        if(!isConnected){
            return internalServerIssue(new Error("Failed to connect databse!"))
        }

        // alaready existance 
        const isExist = await User.find({$or:[
            {email:{$regex:body.email, options:'i'}},
            {phoneNumber:{$regex:body.phoneNumber, options:"i"}}
        ]}).lean().select("_id")
        if(isExist){
            return conflictError("user already register with these record!")
        }

        // user register 
        
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }
    
}