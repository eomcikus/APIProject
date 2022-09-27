'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'spotimage1',
        preview: true
      },
      {
        spotId: 2,
        url: 'spotimage2',
        preview: true
      },
      {
        spotId: 3,
        url: 'spotimage3',
        preview: false
      },
      {
        spotId: 4,
        url: 'spotimage4',
        preview: true
      },
      {
        spotId: 5,
        url: 'spotimage5',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
