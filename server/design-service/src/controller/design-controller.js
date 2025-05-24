const Design = require('../models/design')
exports.getUserDesigns = async (req, res) => {
    try {
        const userId = req.user.userId
        const designs = await Design.find({ userId }).sort({ updatedAt: -1 })
        return res.status(200).json({
            success: true,
            message: "Fetched Designs successfully",
            data: designs
        })
    } catch (error) {
        console.log("Error fetching Designs", error)
        return res.status(500).json({
            success: false,
            message: " Failed to fetch designs",
            error: error.message || error,
        })
    }
}


exports.getUserDesignsByID = async (req, res) => {
    try {
        const userId = req.user.userId
        const designId = req.params.id

        const design = await Design.findOne({ _id: designId, userId })

        if (!design) {
            return res.status(404).json({
                success: false,
                message: "Design not found or you are not authorized",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Fetched Design successfully",
            data: design
        })
    } catch (error) {
        console.log("Error fetching Designs by ID", error)
        return res.status(500).json({
            success: false,
            message: " Failed to fetch designs ID", error
        })
    }
}



exports.saveUserDesigns = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { designId, name, canvasData, width, height, category } = req.body
        if (designId) {
            const design = await Design.findOne({ _id: designId, userId })
            if (!design) {
                return res.status(404).json({
                    success: false,
                    message: "Design not found or you are not authorized",
                })
            }



            if (name) design.name = name
            if (canvasData) design.canvasData = canvasData
            if (width) design.width = width
            if (height) design.height = height
            if (category) design.category = category
            design.updatedAt = Date.now()
            const updatedDesign = await design.save()
            return res.status(200).json({
                success: true,
                message: "Design updated successfully",
                data: updatedDesign
            })
        } else {
            const newDesign = new Design({
                userId,
                name: name || "Untitled Design",
                width,
                height,
                canvasData,
                category,
            })

            const saveDesign = await newDesign.save()
            return res.status(200).json({
                success: true,
                message: "Design updated successfully",
                data: saveDesign
            })
        }
    } catch (error) {
        console.log("Error Saving Designs ", error)
        return res.status(500).json({
            success: false,
            message: " Failed to save designs ", error
        })
    }
}

exports.DelUserDesigns = async (req, res) => {
    try {
        const userId = req.user.userId
        const designId = req.params.id

        const design = await Design.findOne({ _id: designId, userId })

        if (!design) {
            return res.status(404).json({
                success: false,
                message: "Design not found or you are not authorized",
            })
        }
        await Design.deleteOne({ _id: designId })
        return res.status(200).json({ message: "Desgin deleted successfully" })
    } catch (error) {
        console.log("Error Deleting Designs ", error)
        return res.status(500).json({
            success: false,
            message: " Failed to Deleting designs ", error
        })
    }
}