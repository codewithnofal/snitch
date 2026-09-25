export const createProductController = async (req, res) => {
    console.log(req.body)

    res.status(200).json({
        message: "dummy product created"
    })
}