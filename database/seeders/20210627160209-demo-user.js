'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        Password: "john",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Aniket',
        lastName: 'Doe',
        email: 'Aniket@example.com',
        Password: "aniket",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Parth',
        lastName: 'Doe',
        email: 'Parth@example.com',
        Password: "Parth",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
