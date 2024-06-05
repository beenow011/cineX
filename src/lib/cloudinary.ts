import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath:string) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("file is uploaded on cloudinary", response.url)
        // console.log("cloudinary", response)
        fs.unlinkSync(localFilePath)
        return response;
    } catch (err) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}
const deleteFileFromCloudinary = async (localFilePath:string, path = "image") => {
    try {
        if (!localFilePath) return null;
        console.log("file", localFilePath)
        const response = await cloudinary.uploader.destroy(localFilePath, {
            resource_type: path
        });
        console.log(response)
        return response;
    } catch (err) {
        console.error("Error deleting file from Cloudinary:", err);
        return null;
    }
};

export { uploadCloudinary, deleteFileFromCloudinary }