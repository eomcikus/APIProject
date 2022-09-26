'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings',[
      {
        startDate: '09/29/2023',
        endDate: '10/3/2023'
      },
      {
        startDate:'10/10/2024',
        endDate: '10/25/2024'
      },
      {
        startDate:'12/12/2024',
        endDate: '12/15/2024'
      },
      {
        startDate:'08/11/2024',
        endDate: '08/22/2024'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Bookings', null, {})
   
  }
};
