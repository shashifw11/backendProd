const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // collection brear token from request body
    // console.log("authHeader" , authHeader) =>  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTM4NjIxN2QxNjllOTEwZDk2ZWEzNmMiLCJ1c2VybmFtZSI6InNoYXNoaSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzgyMDg0MjgxLCJleHAiOjE3ODIwODUxODF9.MfsYTZI0BK6UkIepLZot4di7OmW8L9mkJ4-SELrKnnM
    const token =
        authHeader && authHeader.split(" ")[1];  // for getting the token we can split bearer and token saparately and get only token for use

    if (!token) {
        return res.status(401).json({
            success: false,
            message:
                "Access denied. No token provided. Please login to continue with correct credintial"
        });
    }
    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        console.log("decodedToken:", decodedToken);     //decodedToken: {  
                                                                    //   userId: '6a386217d169e910d96ea36c',
                                                                    //   username: 'shashi',
                                                                    //   role: 'user',
                                                                    //   iat: 1782090903,
                                                                    //   exp: 1782091803
                                                                    //   }

        req.userInfo = decodedToken;   // here i am add this decodedToken info to user Info

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired token. Please login again."
        });
    }
};

module.exports = authMiddleware;