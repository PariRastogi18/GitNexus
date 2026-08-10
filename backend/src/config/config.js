import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URL){
    console.log("MONGO_URL is not defined in environmental variable");
}

export const config = {
    PORT: process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    JWT_SECRETE:process.env.JWT_SECRETE,
}