
// ============================================================
// CLOUDINARY CONFIG — handles image uploads
// Free plan: 25GB storage, 25GB bandwidth/month
// Works locally AND on Render in production
// ============================================================

import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
dotenv.config()

const connectCloudinary = async(): Promise<void> =>{
    try {
         cloudinary.config({
            cloudinary_url: process.env.CLOUDINARY_URL
        });
        console.log("Cloudinary Configuration Loaded");
    } catch (error) {
        console.error ("Connection Error", error)
        process.exit(1)
    }
}

export default connectCloudinary