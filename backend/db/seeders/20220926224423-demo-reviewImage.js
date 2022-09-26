'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('ReviewImages', [
  {
    url: 'www.image.com'
  },
  {
    url: 'www.thebeach.com'
  },
  {
    url: 'www.lotsofimages.com'
  },
  {
    url: 'www.imagehostingsite.com'
  },
  {
    url: 'www.somanyphotos.com'
  }
])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviewImages', null, {})
  }
};
