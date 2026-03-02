import { internalServerIssue } from "@/utils/apiResponses";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        // api authentication
        
    } catch (error) {
        console.log(error)
        return internalServerIssue(error as Error)
    }
    
}