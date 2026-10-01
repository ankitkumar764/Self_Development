const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing",
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid authorization format",
        });
    }

    const token = authHeader.split(" ")[1]; //split space ke basis par array bearer,token then fisrt ind lelo 
    console.log("token", token)

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    console.log(decoded);

    next();
};

module.exports = authMiddleware;