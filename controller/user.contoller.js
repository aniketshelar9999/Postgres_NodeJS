const db = require("../models");
const config = require("../config/auth.config");
const Users = db.users;
const RefreshToken = db.refreshToken;
// const { refreshToken: RefreshToken } = db;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    // console.log('req',req.body);s
    const {
        firstName, lastName,
        email,
        Password
    } = req.body;
    console.log("req", req.body);
    try {
        let user = await Users.findOne({ where: { email: email } });
        console.log("user result ", user);
        if (user) {
            return res.status(200).json({
                message: "User Already Exists"
            });
        }
        let User = {
            firstName, lastName,
            email,
            Password
        };

        const salt = await bcrypt.genSalt(10);
        User.Password = await bcrypt.hash(Password, salt);
        await Users.create(User);
        return res.json({
            success: true,
            message: "User Registered succesfully"
        });

    }
    catch (err) {
        console.log('error',err);
        const errObj = {};
        err.errors.map(er => {
            errObj[er.path] = er.message;
        })
        res.status(400).send({
            success: false,
            message: errObj
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("req", req.body);
    try {
        let user = await Users.findOne({ where: { email: email } });
        // let user = await Users.findOne({ where: { email: email } });
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });
        console.log("user", user);
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        // const payload = {
        //     user: {
        //         id: user.id
        //     }
        // };
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration
        });
        let refreshToken = await RefreshToken.createToken(user);
        // jwt.sign(
        //     payload,
        //     config.secret,
        //     {
        //         expiresIn: '180s'
        //     },
        //     async (err, token) => {
        //         if (err) throw err;
        //         else 
        //         let refreshToken = await RefreshToken.createToken(user);
        res.status(200).json({
            Token: token,
            refreshToken: refreshToken,
            firstname: user.firstname,
            email: user.email,
            userId: user.id
        });
        // }
        // );

    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

exports.refreshToken = async (req, res) => {
    console.log("req", req.body);
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

        console.log("result of refresh token", refreshToken);

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }
        // console.log('ref-----', refreshToken);
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken;

        console.log("user", user.userId);

        let newAccessToken = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    }
    catch (err) {
        return res.status(500).send({ message: err });
    }
};