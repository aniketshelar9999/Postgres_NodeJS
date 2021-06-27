const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshtoken", {
        token: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users', // 'categories' refers to table name
                key: 'id', // 'id' refers to column name in categories table
            }
        },
        expiryDate: {
            type: Sequelize.DATE,
        },
    });

    RefreshToken.createToken = async function (user) {
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

        let _token = uuidv4();

        let refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expiredAt.getTime(),
        });

        return refreshToken.token;
    };

    RefreshToken.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };

    return RefreshToken;
};