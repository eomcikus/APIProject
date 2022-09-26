'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        address: '1234 Wilson Ave',
        city: 'Billings',
        state: 'VT',
        country: 'USA',
        lat: 123.4,
        long: 123.4,
        name: 'Forest Chill',
        description: 'A lovely home in the forest',
        price: 400.0,
      },
      {
        address: '35 W Mississippi Ave',
        city: 'Long Beach Island',
        state: 'NJ',
        country: 'USA',
        lat: 56.5,
        long: 54.5,
        name: 'Corner Bay Lot Home!',
        description: 'A home nestled on the shore of the bay, within walking distance of the beach',
        price: 2500.0,
      },
      {
        address: '1144 Donut Street',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 60.4,
        long: 65.4,
        name: 'Walkable Philly apartment',
        description: 'Beautiful property with Old City charm',
        price: 1300.0,
      },
      {
        address: '7755 Mushroom Lane',
        city: 'Kennett Square',
        state: 'PA',
        country: 'USA',
        lat: 78.4,
        long: 99.4,
        name: 'Adorable Kennett Square charmer',
        description: 'Enjoy the fun of Kennett Square while also its beautiful landscape. Dont mind the smell!',
        price: 700.0,
      },
      {
        address: '5676 Piano Street',
        city: 'West Chester',
        state: 'PA',
        country: 'USA',
        lat: 110.2,
        long: 100.2,
        name: 'West Chester rowhome',
        description: 'West Chesters restaurant scene is a walk away from this adorable row home!',
        price: 1200.0,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {})

  }
};
