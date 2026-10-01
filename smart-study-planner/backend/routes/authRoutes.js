const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


//protected wala special route
router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed the protected route",
    });
});

module.exports = router;