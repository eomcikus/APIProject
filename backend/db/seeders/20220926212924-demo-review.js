'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'This house was very nice',
        stars: 4.3,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Do not stay here. Its haunted',
        stars: 1.2,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'I loved the views from the back porch',
        stars: 4.6,
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Nothing in this house worked and no one answered my calls all weekend',
        stars: 2.1,
      },
      {
        spotId: 5,
        userId: 5,
        review: 'The pictures made this house look way bigger than it actually was',
        stars: 3.3,
      }
    ])
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('People', null, {});
     
  }
};
