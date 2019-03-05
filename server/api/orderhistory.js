const router = require('express').Router()
const {OrderHistory} = require('../db/models')
const sendGridMail = require('@sendgrid/mail')
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.admin) {
      res.send('Oops! You should probably log in first.')
    } else {
      const orders = await OrderHistory.findAll()
      res.send(orders)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (Number(req.params.userId) === req.user.id || req.user.admin) {
      const userOrders = await OrderHistory.findAll({
        where: {
          userId: req.params.userId
        },
        order: [['createdAt', 'DESC']]
      })
      res.send(userOrders)
    } else {
      res.status(403)
      res.send('Oops! You should probably log in first.')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/guestCheckout', async (req, res, next) => {
  try {
    const toCreate = await Promise.all(
      req.body.cart.map(elem => {
        return OrderHistory.create({
          productName: elem.name,
          imageURL: elem.imageUrl,
          checkoutPrice: elem.currentPrice,
          userId: null,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })
      })
    )
    const msg = {
      to: 'atienza.ken@gmail.com',
      from: 'Batguys <Batguys@sendgrid.io>',
      subject: 'Batguys Order Confirmation',
      text:
        'Hi, your shirt order was placed with Batguys T-shirt online retailer!',
      html: `If you would like to modify your order, go back to <a href="https://batguys.herokuapp.com/">Batguys</a>.`
    }

    try {
      sendGridMail.send(msg)
    } catch (err) {
      console.log('Error sending email', err)
    }

    res.send(toCreate)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const toCreate = await Promise.all(
      req.body.cart.map(elem => {
        return OrderHistory.create({
          productName: elem.product.name,
          imageURL: elem.product.imageUrl,
          checkoutPrice: elem.product.currentPrice,
          userId: req.params.userId,
          email: req.body.userEmail,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })
      })
    )
    res.send(toCreate)
  } catch (error) {
    next(error)
  }
})
