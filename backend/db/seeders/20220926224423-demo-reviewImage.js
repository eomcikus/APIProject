'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'www.image.com'
      },
      {
        reviewId: 2,
        url: 'www.thebeach.com'
      },
      {
        reviewId: 3,
        url: 'www.lotsofimages.com'
      },
      {
        reviewId: 4,
        url: 'www.imagehostingsite.com'
      },
      {
        reviewId: 5,
        url: 'www.somanyphotos.com'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviewImages', null, {})
  }
};
