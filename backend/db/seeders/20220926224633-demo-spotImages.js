'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        url: 'spotimage1',
        preview: true
      },
      {
        url: 'spotimage2',
        preview: true
      },
      {
        url: 'spotimage3',
        preview: false
      },
      {
        url: 'spotimage4',
        preview: true
      },
      {
        url: 'spotimage5',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
