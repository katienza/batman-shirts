const User = require('./user')
const Product = require('./product')
const OrderHistory = require('./orderHistory')
const Cart = require('./cart')

OrderHistory.belongsTo(User)
User.hasMany(OrderHistory)

User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)

module.exports = {
  User,
  Product,
  OrderHistory,
  Cart
}
