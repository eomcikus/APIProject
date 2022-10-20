'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://torontolife.com/wp-content/uploads/2019/10/HZIsuuNp.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.fodors.com/wp-content/uploads/2020/04/05_UpsideDownHouses__TheWorldUpsideDown_5.-Trassenheide_Die_Welt_steht_Kopf.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://tinyliving.com/wp-content/uploads/2017/09/amplified-1.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_33/1599433/pie-house-mc-main1-2008118.jpg',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
