const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
// module.exports = function (req, res, next) {
//     const token = req.header("token");
//     if (!token) return res.status(401).json({ message: "Auth Error Token expired " });

//     try {
//         const decoded = jwt.verify(token, config.secret);
//         req.user = decoded.user;
//         next();
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({ message: "Invalid Token" });
//     }
// };
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        console.log("requserid",req.userId);
        next();
    });
};
const authJwt = {
    verifyToken: verifyToken,
  };
  module.exports = authJwt;