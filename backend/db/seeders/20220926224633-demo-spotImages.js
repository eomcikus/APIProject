'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
  options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
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
      },
      {
        spotId: 6,
        url: 'https://livinginatiny.com/wp-content/uploads/2021/02/Gorgeous-and-Uniquely-Designed-Tiny-House-Model_2.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/originals/9e/fc/23/9efc23774cfb68e26db03fd40e9eed43.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/d369d12f-21cd-459b-ae90-de8408dc3b08-4.%20secluded-airship-scotland-exterior.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://img.buzzfeed.com/buzzfeed-static/static/2021-08/24/18/asset/636d0eb22988/sub-buzz-1152-1629830394-12.png',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/d1a88bb5-82c3-41a9-80c1-3b7f95859ca8-1.%20escape-pod-uk-exterior.jpg',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, null, {})
  }
};
