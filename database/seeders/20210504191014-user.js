module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John',
        email: 'John@Doe.com',
        password: '$2b$10$Dka0uBhWV/zEcjcCiFjtAu9VRZ7tkyxPmfrisiQUr3Jvj7jCdGG6W', // 4WB9mx6j
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
