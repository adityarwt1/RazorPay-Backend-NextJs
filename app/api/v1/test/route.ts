import { commonResponse, HttpStatusCode, internalServerIssue } from "@/utils/apiResponses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest):Promise<NextResponse> {
    try {
        return commonResponse({message:"woking", status:HttpStatusCode.OK,success:true})
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }

    
}