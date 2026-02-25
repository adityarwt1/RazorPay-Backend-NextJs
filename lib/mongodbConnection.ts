import mongoose from "mongoose";

export const connectMongoDb = async () : Promise<boolean>=> {
    try {
        if(mongoose.connection.readyState == 1){
            return true
        }
        const isConnected = await mongoose.connect(process.env.MONGODB_URI as string ,{
            dbName:"RazorPayBackend"
        })

        if(isConnected){
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false
        
    }
}