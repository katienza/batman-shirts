'use strict'
const db = require('../server/db')
const {User, Product, Cart, OrderHistory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'jane.doe@gmail.com',
      password: '123',
      firstName: 'Jane',
      lastName: 'Doe',
      admin: false,
      phoneNumber: '7321239876',
      billingAddress: '12 Wall Street, New York City, NY 10005'
    }),
    User.create({
      email: 'john.smith@gmail.com',
      password: '789',
      firstName: 'John',
      lastName: 'Smith',
      admin: false,
      phoneNumber: '2013278910',
      billingAddress: '34 Street, New York City, NY 10001'
    }),
    User.create({
      email: 'admin@gmail.com',
      password: '123',
      firstName: 'Doctor',
      lastName: 'Disrespect',
      admin: true,
      phoneNumber: '1231231234',
      billingAddress: 'The North Pole'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({
      name: 'Call Batman Tee',
      description: 'Keep Calm and Call Batman Mens Short Sleeve Shirt',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0026/5381/4854/products/keep-calm-and-call-batman-t-shirt-superhero-supervillain-dc-comics-mxed-united-states-superherosupervillain-com_178_300x300.jpg?v=1545210008',
      currentPrice: 1599
    }),
    Product.create({
      name: 'Joker Half Face Tee',
      description: 'Half Face Joker Fun Mens Short Sleeve T-Shirt',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0002/1040/3390/products/840436_740x.jpg?v=1523991529',
      currentPrice: 2199
    }),
    Product.create({
      name: 'Always be Batman T-Shirt',
      description:
        'Always be Yourself Unless You Can be Batman Mens Short Sleeve T-Shirt',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'http://www.desibonkers.com/wp-content/uploads/2018/08/batwhite-300x300.jpg',
      currentPrice: 1999
    }),
    Product.create({
      name: 'Steampunk Batman Tee',
      description: 'Steampunk Batman Mens Short Sleeve Tee',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://www.movie-tees.com/uploads/products/thinkgeek-exclusive-steampunk-batman-t-shirt-black-xxl_tg01f78blk2x.jpg',
      currentPrice: 2199
    }),
    Product.create({
      name: 'Leg Day Batman Tee',
      description: 'Batman Never Skips Leg Day Mens Short Sleeve Tee',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://bornlion.com/wp-content/uploads/2018/12/legday-batman-born-lion-fitness-tshirt.jpg',
      currentPrice: 1499
    }),
    Product.create({
      name: 'Batman in the Morning Tee',
      description: 'Not a Morning Person Batman Mens Short Sleeve Tee',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://www.thinkgeek.com/images/products/frontsquare/klhu_batman_not_morning_person_shirt_mb.jpg',
      currentPrice: 1599
    })
  ])

  console.log(`seeded ${products.length} products`)
  console.log(`seeded products successfully`)

  const carts = await Promise.all([
    Cart.create({
      userId: 1,
      productId: 1
    })
  ])
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded carts successfully`)

  const Orders = await Promise.all([
    OrderHistory.create({
      productName: 'Batman Arkham Origins',
      imageURL:
        'https://i5.walmartimages.com/asr/50280214-4281-474d-bafb-beb8a653a2b9_1.830a9f11e14c2856b44671f3c3dd6658.jpeg?odnWidth=600&odnHeight=826&odnBg=ffffff',
      size: 'M',
      checkoutPrice: 1999,
      userId: 1,
      address: '12 Wall Street, New York City, NY 10005'
    })
  ])
  console.log(`seeded ${Orders.length} order history`)
  console.log(`seeded order history successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
