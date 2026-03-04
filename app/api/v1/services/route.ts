import { connectMongoDb } from "@/lib/mongodbConnection";
import { badRequest, internalServerIssue,  } from "@/utils/apiResponses";
import { generateId } from "@/utils/generateIds/generateIds";
import { apiAndSecretValidation } from "@/utils/secretValidatoin/secretValidatoin";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        // api authentication 
        const apiAuthentication = await apiAndSecretValidation(req)
        if(!apiAuthentication.isValid || !apiAuthentication.authorId){
            return badRequest(apiAuthentication.error || "Invalid request!")
        }
        // connectinig to database
        const isConnected = await connectMongoDb()

        if(!isConnected){
            return internalServerIssue(new Error('Failed to connect database!'))
        }

        // using service
        const apiKey = `razorPayApiKey_${generateId()}`
        const secretKey = `razorPaySecretKey_${generateId()}`

        // const secretKey = await 
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }
}