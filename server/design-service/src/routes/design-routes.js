const express = require("express")
const authenticatedRequest = require("../middleware/auth-middleware")
const designController = require("../controller/design-controller")
const router = express.Router()

router.use(authenticatedRequest)
router.get("/", designController.getUserDesigns)
router.get("/:id", designController.getUserDesignsByID)
router.post("/", designController.saveUserDesigns)
router.delete("/:id", designController.DelUserDesigns)
module.exports = router