module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      // validate: {
      //   notNull: { args: true, msg: "You must enter a firstName" }
      // },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      // validate: {
      //   notNull: { args: true, msg: "You must enter a lastName" }
      // },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false
    },

  });

  return User;
};