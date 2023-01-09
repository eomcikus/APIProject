'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('September 29, 2024'),
        endDate: new Date('October 3, 2024')
      },
      {
        spotId: 2,
        userId: 2,
        startDate:new Date('October 10, 2025'),
        endDate: new Date('October 25, 2025')
      },
      {
        spotId: 3,
        userId: 3,
        startDate:new Date('December 10, 2024'),
        endDate: new Date('December 24, 2024')
      },
      {
        spotId:4,
        userId:4, 
        startDate: new Date('August 11, 2024'),
        endDate: new Date('August 22, 2024')
      },
      {
        spotId:5,
        userId:5, 
        startDate: new Date('August 23, 2025'),
        endDate: new Date('August 25, 2025')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
   await queryInterface.bulkDelete(options, null, {})
   
  }
};
