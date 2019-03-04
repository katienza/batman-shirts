const router = require('express').Router()
const {User, Product, Cart, OrderHistory} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.admin) {
      res.send('Oops! You should probably log in first.')
    } else {
      const users = await User.findAll({
        attributes: ['id', 'email']
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user.id === !req.params.userId) {
      res.send('Oops! You should probably log in first.')
    }
    const cartItems = await Cart.findAll({
      where: {
        userId: req.params.userId
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.send(cartItems)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orderhistory', async (req, res, next) => {
  try {
    if (!req.user || !req.user.admin) {
      res.send('Oops! You should probably log in first.')
    } else {
      const userhistory = await OrderHistory.findAll({
        where: {
          userId: req.params.userId
        }
      })
      res.send(userhistory)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const itemToBeAdded = await Cart.create({
      productId: req.body.id,
      userId: req.params.userId
    })
    res.send(itemToBeAdded)
  } catch (error) {
    next(error)
  }
})

router.delete('/cart/:cartId', async (req, res, next) => {
  try {
    const itemToDelete = await Cart.findOne({
      where: {
        id: req.params.cartId
      }
    })
    itemToDelete.destroy()
    res.send(itemToDelete)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.params.userId
      }
    })
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})
