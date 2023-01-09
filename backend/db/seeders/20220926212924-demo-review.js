'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'This house was very nice. We liked the floor to ceiling windows and the stunning kitchen. Next time we might ask for more fresh linens in the house.',
        stars: 4.3,
      },
      {
        spotId: 2,
        userId: 6,
        review: 'Do not stay here. Its haunted. I had many sleepless nights here and had to end my stay early because of it. Other than the ghost the accommodations were lovely.',
        stars: 1.2,
      },
      {
        spotId: 3,
        userId: 7,
        review: 'This house was funny looking but was in a great location. It was quiet at night which was nice too. Definitely recommend it to see Philly.',
        stars: 4.6,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Nothing in this house worked and no one answered my calls all weekend. We could not get the windows open onto the porch which was the feature we were most excited about at this spot.',
        stars: 2.1,
      },
      {
        spotId: 5,
        userId: 1,
        review: 'The pictures made this house look way bigger than it actually was. I could barely move in the house but luckily I was visiting friends so I could stay with them. I filed a claim to get my money back',
        stars: 3.3,
      },
      {
        spotId: 6,
        userId: 1,
        review: 'This house was exactly what I needed. I worked remotely and liked the hiking and local village nearby. House was clean and tidy and made it easy to get lots of work done with minimal distraction.',
        stars: 4.7,
      },
      {
        spotId: 7,
        userId: 6,
        review: 'This house was great and very clean. Lots of bright light. We enjoyed the fire stove, it kept the house super toasty and comfy.',
        stars: 4.7,
      },
      {
        spotId: 8,
        userId: 4,
        review: 'We heart the DOME! This was a great little spot to take in the views and natural light. The house is super cozy and we loved the decor.',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 3,
        review: 'This fire lookout was a fun and unique place to stay. It was so fun imagining how boring that job must have been, but then again it was cool to watch nature and chill.',
        stars: 5,
      },
      {
        spotId: 10,
        userId: 2,
        review: 'The egg was a luxurious home away from home while I enjoyed wine country. It was just what I needed to come home to after a long day of hiking and exploring new wineries. A good egg.',
        stars: 5,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Reviews', null, {});
     
  }
};
