"use server"

import { connectMongoDb } from "@/lib/mongodbConnection"
import { NextRequest } from "next/server"
import { HttpStatusText } from "../apiResponses"
import crypto from "cryptojs"
interface APIandServicesResultInterface {
    isValid:false,
    error?:HttpStatusText
    
}
interface CryptoSecretInterface {
    apiKey:string,
    secretKey:string
}
const apiAndSecretValidation = async (req:NextRequest):Promise<APIandServicesResultInterface>=>{
    try {
        const authSecret = req.headers.get(process.env.HEADER_SECRET as string) 
        // if header not provided yett  
        if(!authSecret){
            return {
                isValid:false
            }
        }
        // decoding value
        const decoded:CryptoSecretInterface  = await crypto.AES.decode(authSecret)
        /// when faild to connected database
        const isConnected = await connectMongoDb()
        if(!isConnected){
            return {
                isValid:false,
                error:HttpStatusText.INTERNAL_SERVER_ERROR
            }
        }
        
        // services available for now or waht
        
    } catch (error) {
        console.log(error)
        return {
            isValid:false
        }
    }   
}