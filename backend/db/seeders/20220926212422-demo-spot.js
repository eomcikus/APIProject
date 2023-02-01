'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
  options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1234 Wilson Ave',
        city: 'Billings',
        state: 'VT',
        country: 'USA',
        lat: 44.264,
        lng: -72.551,
        name: 'Forest Chill',
        description: 'A lovely home in the forest. Enjoy quiet time away from the hustle and bustle of city life with plenty of natural light. House is equipped with fiber internet so remote work is possible.',
        price: 400.0,
      },
      {
        ownerId: 2,
        address: '35 Avenue Ave',
        city: 'Long Beach Island',
        state: 'NJ',
        country: 'USA',
        lat: 39.6511,
        lng: -74.19403,
        name: 'Corner Bay Lot Home!',
        description: 'A home nestled on the shore of the bay, within walking distance of the beach. Enjoy the luxury of spending time on the dock on days when the beach is buggy, and take a dip in the bay to cool off.',
        price: 2500.0,
      },
      {
        ownerId: 3,
        address: '1144 Donut Street',
        city: 'Philadelphia',
        state: 'PA',
        country: 'USA',
        lat: 39.96242,
        lng: -75.16311,
        name: 'Walkable Philly apartment',
        description: 'Beautiful property with Old City charm. This house is historic because when the Eagles won the Superbowl, a group of fans successfully turned it over. Enjoy a piece of modern history in a central location.',
        price: 1300.0,
      },
      {
        ownerId: 4,
        address: '7755 Mushroom Lane',
        city: 'Kennett Square',
        state: 'PA',
        country: 'USA',
        lat: 39.84584,
        lng: -75.71174,
        name: 'Adorable Kennett Square charmer',
        description: 'Enjoy the fun of Kennett Square while also its beautiful landscape. Walk to State Street and enjoy a beverage and browse the local shops. Take a day trip to Longwood Gardens. Dont mind the smell!',
        price: 700.0,
      },
      {
        ownerId: 5,
        address: '5676 Piano Street',
        city: 'West Chester',
        state: 'PA',
        country: 'USA',
        lat: 39.96360,
        lng: -75.60640,
        name: 'West Chester rowhome',
        description: 'The West Chester restaurant scene is a walk away from this adorable row home! A great option if you need small accommodations while visiting your student at WCU! Take a day trip to Longwood Gardens.',
        price: 1200.0,
      },
      {
        ownerId: 5,
        address: '1188 Desert Way',
        city: 'Desert',
        state: 'CA',
        country: 'USA',
        lat: 37.93332,
        lng: -119.84198,
        name: 'Sideways Getaway',
        description: 'Wow! This home is an optical illusion but is filled with amazing views of the landscape and natural light. House is perfect for remote work, outfitted with fiber.',
        price: 1500.0,
      },
      {
        ownerId: 6,
        address: 'In the middle of the forest',
        city: 'North Forest',
        state: 'PA',
        country: 'USA',
        lat: 41.60655,
        lng: -79.17759,
        name: 'Tiny Forest Getaway',
        description: 'Another tiny home that will take your breath away! Stunning Scandinavian design lends itself to a minimalist\'s vacation dream!',
        price: 900.0,
      },
      {
        ownerId: 6,
        address: '6 Tiny Dome Road',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 47.61591,
        lng: -122.35242,
        name: 'Warm Cozy Dome',
        description: 'Enjoy this tiny dome right outside of Seattle! With stunning views and floor to ceiling windows, you are sure to enjoy your stay. ',
        price: 900.0,
      },
      {
        ownerId: 2,
        address: '6 National Park Road',
        city: 'Portland',
        state: 'OR',
        country: 'USA',
        lat: 45.52724,
        lng: -122.72651,
        name: 'Old Fire Lookout',
        description: 'Enjoy the stunning views from this converted fire lookout. Please note that this house has multiple flights of stairs to ascend to enter the house. ',
        price: 700.0,
      },
      {
        ownerId: 2,
        address: '6 National Park Road',
        city: 'Napa',
        state: 'CA',
        country: 'USA',
        lat: 38.29726,
        lng: -122.28756,
        name: 'The Egg',
        description: 'Do you want to take a vow of silence? Book this whimsical egg with window cutouts to enjoy the lovely farmland that surrounds it. Located on a winery. ',
        price: 700.0,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, null, {})

  }
};
