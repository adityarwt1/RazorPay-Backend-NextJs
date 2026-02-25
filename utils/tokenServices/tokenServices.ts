"use server"
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
export const createAndSaveToken = async (tokenPayLoad:TokenInterface ):Promise<{
    isCreated:boolean,
    token?:string
}>=>{
    try {
        const jwtSecret  = process.env.JWT_SECRET as string
        // if secret is nnot avalable 
        if(!jwtSecret) return {
            isCreated:false
        }
        // creating token 
        let token;
        try {
            token = jwt.sign(tokenPayLoad, jwtSecret, {
                expiresIn:30*24 * 60 * 60,
            })
        } catch (error) {
            console.log(error)
            return {
                isCreated:false
            }
        }
        if(!token) return {
            isCreated:false
        }
        /// saveing into cookie
        const cookiesStore = await cookies()
        // cookie  name, when it is not given in the vercel deployment this while might thorgh error
        const cookieName = process.env.COOKIE_NAME as string
        if(!cookieName) return {
            isCreated:false
        }
        cookiesStore.set(cookieName, token, {
            httpOnly:true,
            path:"/",
            sameSite:"none"
        })
        return {
            isCreated:true,
            token
        }
    } catch (error) {
        console.log(error)   
        return {
            isCreated:false,
            
        }
    }
}