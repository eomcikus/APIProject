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
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lenora',
        lastName: 'Burgers',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Helen',
        lastName: 'Cheese',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Mark',
        lastName: 'Pizza',
        email: 'ilikedogs3@nomail.com',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Porky',
        lastName: 'Pie',
        email: 'cheesepizza@lamp.com',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Doug',
        lastName: 'Demodome',
        email: 'doug@demodome.com',
        username: 'DougDemodome',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Leslie',
        lastName: 'Knope',
        email: 'leslie@pawnee.com',
        username: 'Leslie',
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