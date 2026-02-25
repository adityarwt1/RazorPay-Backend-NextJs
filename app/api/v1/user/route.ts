import { connectMongoDb } from "@/lib/mongodbConnection";
import User from "@/models/User";
import { badRequest, conflictError, HttpStatusCode, internalServerIssue } from "@/utils/apiResponses";
import { createAndSaveToken } from "@/utils/tokenServices/tokenServices";
import { userRegistrationValidation } from "@/zodValidations/user/userCrudValidations";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest):Promise<NextResponse> {
    try {
        // body validation 
        const body = await req.json()
        const isValidRequest = userRegistrationValidation.safeParse(body)
        if(!isValidRequest.success){
            return badRequest(isValidRequest.error.message ||"please provide valid request!")
        }

        // databse connection
        const isConnected = await connectMongoDb()
        // falied to connected 
        if(!isConnected){
            return internalServerIssue(new Error("Failed to connect databse!"))
        }

        // alaready existance 
        const isExist = await User.find({$or:[
            {email:{$regex:body.email, $options:'i'}}   
        ]}).lean().select("_id")
        if(isExist.length >0){
            return conflictError("user already register with these record!")
        }

        // hashingPassword 
        const hashedPassword = await bcrypt.hash(body.password, 10)
        if(!hashedPassword) return internalServerIssue(new Error("Failed to create user!"))

        // userDocument 
        const userDoc = await User.create({...body, password:hashedPassword})
        /// unexpected errror condition 
        if(!userDoc){
            return internalServerIssue(new Error("faliled to create user!"))
        }

        // creating merchantt id
        const merchantId = `rzrp_${userDoc._id}`
        userDoc.merchantId = merchantId;
        // saving created merchant id
        await userDoc.save()

        // tokenPayload 
        const tokenPayload : TokenInterface= {
            _id:userDoc._id,
            merchantId:userDoc.merchantId
        }
        /// saving into the toekn 
        const isSavedToCookie = await createAndSaveToken(tokenPayload)

        // if failed to creatte and save token 
        if(!isSavedToCookie.isCreated || !isSavedToCookie.token) return internalServerIssue(new Error("Internal server issue!"))
        
        /// savingg also in database 
        userDoc.authToken    = isSavedToCookie.token
        await userDoc.save()
        
        /// return tokne with successResponse
        return NextResponse.json({
            success:true,
            status:HttpStatusCode.CREATED,
            token:isSavedToCookie.token
        },{
            status:HttpStatusCode.CREATED
        })
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }
    
}