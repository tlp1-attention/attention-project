import cloudinary, { UploadApiResponse } from "cloudinary"
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
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
        try {
            const filePath: string = join(__dirname, "../../files", file.name)

            await file.mv(filePath, async (err: any) => {
                if (err) {
                    console.log(err)
                }

                const uploadImage = await uploadImageToCloudinary(filePath)

                resolve(uploadImage)
            })  
        } catch (err) {
            console.error(err)
            reject(err)
        }
    })
}

export const deleteImage = async (uploadResponse: UploadApiResponse) => {
    return new Promise<void>((resolve, reject) => {
        cloudinary.v2.uploader.destroy(uploadResponse.publicId, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve()
            }
        })
    })
}