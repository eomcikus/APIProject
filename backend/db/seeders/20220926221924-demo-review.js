'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        review: 'This house was very nice',
        stars: 4.3,
      },
      {
        review: 'Do not stay here. Its haunted',
        stars: 1.2,
      },
      {
        review: 'I loved the views from the back porch',
        stars: 4.6,
      },
      {
        review: 'Nothing in this house worked and no one answered my calls all weekend',
        stars: 2.1,
      },
      {
        review: 'The pictures made this house look way bigger than it actually was',
        stars: 3.3,
      }
    ])
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('People', null, {});
     
  }
};
