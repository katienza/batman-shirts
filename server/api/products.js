const router = require('express').Router()
const {Product, User} = require('../db/models/')

// Get all products, full route /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.send(products)
  } catch (error) {
    next(error)
  }
})

// Get single product
router.get('/:productID', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        id: req.params.productID
      }
    })
    res.send(singleProduct)
  } catch (error) {
    next(error)
  }
})

//update
router.put('/:productID', async (req, res, next) => {
  try {
    const productToUpdate = await Product.findOne({
      where: {
        id: req.params.productID
      },
      include: [{all: true}]
    })
    // PROTECT REQ.BODY AFTER COMPONENT IS MADE!!!
    let newProduct = {}
    for (let key in productToUpdate) {
      if (req.body.hasOwnProperty(key)) {
        newProduct[key] = req.body[key]
      }
    }
    productToUpdate.update(newProduct)
    res.send(productToUpdate)
  } catch (error) {
    next(error)
  }
})

module.exports = router
