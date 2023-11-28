import cloudinary from "cloudinary"
import { join } from "path";

export const uploadImageToCloudinary = async (filePath: string) => {
    return new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
        cloudinary.v2.uploader.upload(filePath, (error: any, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
    
}

export const uploadImage = async (file: any) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const filePath: string = join(__dirname, "../../files", file.name)

            await file.mv(filePath, async (err: any) => {
                if (err) {
                    console.log(err)
                }

                const uploadImage = await uploadImageToCloudinary(filePath)

                resolve(uploadImage.secure_url)
            })  
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}