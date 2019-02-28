const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  sizes: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  currentPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
