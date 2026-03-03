"use server"

import { connectMongoDb } from "@/lib/mongodbConnection"
import { NextRequest } from "next/server"
import { HttpStatusText } from "../apiResponses"
import  crypto from "crypto-js"
import Service from "@/models/services"
interface APIandServicesResultInterface {
    isValid:boolean
    error?:HttpStatusText | string
    data?:CryptoSecretInterface
    authorId?:string
    amount?:number
    orderId?:string
}
interface CryptoSecretInterface {
    apiKey:string,
    secretKey:string,
    amount?:number,
    orderId:string
}
export const apiAndSecretValidation = async (req:NextRequest):Promise<APIandServicesResultInterface>=>{
    try {
        const authSecret = req.headers.get(process.env.HEADER_SECRET as string) 
        // if header not provided yett  
        if(!authSecret){
            return {
                isValid:false,
                error:"Crypto Secret not provided!"
            }
        }
        // decoding value
        const decoded:CryptoSecretInterface  = JSON.parse(crypto.AES.decrypt(authSecret, process.env.CRYPTO_SECRET as string).toString(crypto.enc.Utf8))
        //if value is not inlside the decode
        if(!decoded.apiKey || !decoded.secretKey){
            return {
                isValid:false,
                error:"apikey and secret not provided yet!"
            }
        }

        // 
        /// when faild to connected database
        const isConnected = await connectMongoDb()
        if(!isConnected){
            return {
                isValid:false,
                error:HttpStatusText.INTERNAL_SERVER_ERROR
            }
        }
        
        // services available for now or waht
        const isExist = await Service.findOne({
            apiKey:decoded.apiKey,
            secretKey:decoded.secretKey
        })

        // is servicdes currentyly not available yet
        if(!isExist || !isExist.available){
            return {
                isValid:false,
                error:"service currently not available with this secret key and apikey!"
            }
        }

        return {
            isValid:true,
            data:decoded,
            authorId:isExist.authorId,
        }
    } catch (error) {
        console.log(error)
        return {
            isValid:false
        }
    }   
}