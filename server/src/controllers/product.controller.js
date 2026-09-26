import { uploadFiles } from "../services/storage.service.js"

export const createProductController = async (req, res) => {
    console.log(req.body)
    console.log(req.files)

    let imageUrls = [];

    for(let i=0; i< req.files.length; i++){
        const response = await uploadFiles({
            buffer: req.files[i].buffer,
            filename: req.files[i].originalname
        })

        console.log(response)
    }

    res.status(200).json({
        message: "dummy product created"
    })
}