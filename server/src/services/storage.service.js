import ImageKit, { toFile } from '@imagekit/nodejs'
import config from '../config/config.js'

const client = new ImageKit({
    privateKey: config.IMAGEKIT_SECRET_KEY,
})

export const uploadFiles = async({buffer, filename}) => {
    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName: filename,
        folder: "snitch",
    })
    return response
}