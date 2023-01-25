'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName= 'Users'
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Ricky',
        lastName: 'Timmy',
        email: 'demo@user.io',
        username: 'Demo-lition',
        userPhoto: 'https://w7.pngwing.com/pngs/752/417/png-transparent-harry-potter-harry-potter-presentation-desktop-wallpaper-potter-thumbnail.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lenora',
        lastName: 'Burgers',
        email: 'user1@user.io',
        username: 'FakeUser1',
        userPhoto: 'https://m.media-amazon.com/images/I/71Vswcmcc1L._AC_UF1000,1000_QL80_.jpg',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Helen',
        lastName: 'Cheese',
        email: 'user2@user.io',
        username: 'FakeUser2',
        userPhoto: 'https://static.vecteezy.com/system/resources/thumbnails/013/453/748/small/cheese-3d-rendering-isometric-icon-png.png',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Mark',
        lastName: 'Pizza',
        email: 'ilikedogs3@nomail.com',
        username: 'FakeUser3',
        userPhoto: 'https://ih1.redbubble.net/image.2102313741.4360/fposter,small,wall_texture,product,750x1000.jpg',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Porky',
        lastName: 'Pie',
        email: 'cheesepizza@lamp.com',
        username: 'FakeUser4',
        userPhoto: 'https://static2.bigstockphoto.com/1/4/2/large1500/241110904.jpg',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Doug',
        lastName: 'Demodome',
        email: 'doug@demodome.com',
        username: 'DougDemodome',
        userPhoto: 'https://static.wikia.nocookie.net/unanything/images/a/a9/Ulqzhfv6j6g21.png',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Leslie',
        lastName: 'Knope',
        email: 'leslie@pawnee.com',
        username: 'Leslie',
        userPhoto: 'https://imageio.forbes.com/blogs-images/thumbnails/blog_1931/pt_1931_485_o.jpg',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'DougDemodome'] }
    }, {});
  }
};