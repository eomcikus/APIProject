'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings',[
      {
        spotId: 1,
        userId: 1,
        startDate: '09/29/2023',
        endDate: '10/3/2023'
      },
      {
        spotId: 2,
        userId: 2,
        startDate:'10/10/2024',
        endDate: '10/25/2024'
      },
      {
        spotId: 3,
        userId: 3,
        startDate:'12/12/2024',
        endDate: '12/15/2024'
      },
      {
        spotId:4,
        userId:4, 
        startDate:'08/11/2024',
        endDate: '08/22/2024'
      },
      {
        spotId:5,
        userId:5, 
        startDate:'08/11/2025',
        endDate: '08/22/2025'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Bookings', null, {})
   
  }
};
