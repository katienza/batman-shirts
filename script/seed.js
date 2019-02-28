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
      name: 'Batman Arkham Origins',
      description: 'Batman Arkham Origins Two Sides Mens Short Sleeve Shirt',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLoY1Q-_B4Z1LyrPZYF89U89_ncGO2ekxtU_351Z2ZJ8me_83IQ',
      currentPrice: 1499
    }),
    Product.create({
      name: 'Joker Fun Tee',
      description: 'Way So Serious Joker Fun Mens Short Sleeve T-Shirt',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://inst-2.cdn.shockers.de/hs_cdn/out/pictures//master/product/1/the_dark_knight_joker_t_shirt_why_so_serious-original_lizenziertes_batman_t_shirt-23463-1.jpg',
      currentPrice: 1899
    }),
    Product.create({
      name: 'Batman Chemistry Tee',
      description:
        'Chemistry Table of Elements Batman Mens Short Sleeve T-Shirt',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://inst-2.cdn.shockers.de/hs_cdn/out/pictures//master/product/1/batman-chemistry-t-shirt--batman-fan-t-shirt--batman-shirt-23467.jpg',
      currentPrice: 2199
    }),
    Product.create({
      name: 'Batman Morning Coffee Tee',
      description: 'I am not a morning person Batman Mens Short Sleeve Tee',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'http://www.thinkgeek.com/images/products/zoom/klhu_batman_not_morning_person_shirt_mb.jpg',
      currentPrice: 2199
    }),
    Product.create({
      name: 'Batman Tee',
      description: "Can't sit with us Batman Mens Short Sleeve Tee",
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://media.kohlsimg.com/is/image/kohls/3298844?wid=500&hei=500&op_sharpen=1',
      currentPrice: 1499
    }),
    Product.create({
      name: 'Batman Dads Tee',
      description: 'Batman for Dads Mens Short Sleeve Tee',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://images.fun.com/products/35067/1-2/batman-dad-mens-t-shirt.jpg',
      currentPrice: 1499
    }),
    Product.create({
      name: 'Newest Batman Tee',
      description: 'Newest Batman Mens Short Sleeve Tee',
      sizes: ['M', 'L', 'XL', 'XLL'],
      imageUrl:
        'https://movie-fanatic-res.cloudinary.com/iu/s--pvzMGpVg--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1382714233/ben-affleck-batman-t-shirt.jpg',
      currentPrice: 1499
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
