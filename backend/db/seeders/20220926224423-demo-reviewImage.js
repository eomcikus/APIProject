'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, null, {})
  }
};
