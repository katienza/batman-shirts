const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  totalPrice: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Cart
