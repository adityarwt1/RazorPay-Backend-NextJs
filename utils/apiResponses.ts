import { NextRequest, NextResponse } from "next/server"

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum HttpStatusText {
  OK = "OK",
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  NO_CONTENT = "NO_CONTENT",

  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",

  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  BAD_GATEWAY = "BAD_GATEWAY",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
}


export const badRequest = async (message:string)=> NextResponse.json<StandardApiResponse>({
    status:HttpStatusCode.BAD_REQUEST,
    success:false,
    error:HttpStatusText.BAD_REQUEST,
    message:message
},
{
    status:HttpStatusCode.BAD_REQUEST
})

export const internalServerIssue = async (error?: Error)=> NextResponse.json<StandardApiResponse>({
    status:HttpStatusCode.INTERNAL_SERVER_ERROR,
    success:false,
    error: (error as Error).message || HttpStatusText.INTERNAL_SERVER_ERROR,
    message:"Internal server issue!"
},
{
    status:HttpStatusCode.INTERNAL_SERVER_ERROR
})

export const enexpectedError  = async (message?:string)=> NextResponse.json<StandardApiResponse>({
    status:HttpStatusCode.INTERNAL_SERVER_ERROR,
    success:false,
    error:HttpStatusText.INTERNAL_SERVER_ERROR,
    message:message || "Unexpected Error!"
},
{
    status:HttpStatusCode.INTERNAL_SERVER_ERROR
})

export const conflictError = async (message?:string)=> NextResponse.json<StandardApiResponse>({
    status:HttpStatusCode.CONFLICT,
    success:false,
    error:HttpStatusText.CONFLICT,
    message:message || "Already exist!"
},
{
    status:HttpStatusCode.CONFLICT
}
)

export const notFound = async (message?:string)=> NextResponse.json<StandardApiResponse>({
    status:HttpStatusCode.NOT_FOUND,
    success:false,
    error:HttpStatusText.NOT_FOUND,
    message:message || "Not found!"
},
{
    status:HttpStatusCode.NOT_FOUND
})

export const unAuthorized = async()=> NextResponse.json<StandardApiResponse>({
    status:HttpStatusCode.UNAUTHORIZED,
    success:false,
    error:HttpStatusText.UNAUTHORIZED,
},
{
    status:HttpStatusCode.UNAUTHORIZED
})

export const commonResponse = async (json:StandardApiResponse)=> NextResponse.json({...json})

export const searchParams = async (req:NextRequest) => req.nextUrl.searchParams
export const headers = async (req:NextRequest) => req.headers

interface StandardApiResponse 
{
    success:boolean,
    status:HttpStatusCode,
    error?:HttpStatusText | Error | unknown,
    message?:string
}