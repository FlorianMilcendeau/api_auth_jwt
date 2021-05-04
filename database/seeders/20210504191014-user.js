'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      name: 'John@Doe.com',
      email: 'John@Doe.com',
      password: '$2b$10$rz0Ps/EM1FE9xo9/9A/5pecpbG9wPPXPsfqxBGUUaIV1oBg0CNW2y', // hello world
      created_at: new Date(),
    }]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
