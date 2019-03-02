import React from 'react'
import {connect} from 'react-redux'
import Link from 'react-router'
import {
  Button,
  Modal,
  Header,
  Item,
  Icon,
  Divider,
  Segment
} from 'semantic-ui-react'
import CheckoutModal from './checkout'
import RemoveFromCartButton from './removeFromCartButton'

const priceFormat = price => {
  let displayPrice = `$${price}`
  return `${displayPrice.slice(0, displayPrice.length - 2) +
    '.' +
    displayPrice.slice(displayPrice.length - 2)}`
}

const CartModal = props => {
  const {cart, userId} = props
  const isLoggedIn = !!userId
  console.log('PROPS ---', props)

  let total = 0

  return (
    <Modal
      trigger={
        <Button id="navbar-cart-modal">
          <Icon name="shopping cart" size="large" />
        </Button>
      }
      closeIcon
    >
      <Header icon="shopping cart" content="Shopping Cart" />
      <Modal.Content>
        <Item.Group divided>
          {cart.map((cartItem, idx) => {
            const product = userId ? cartItem.product : cartItem
            if (product) {
              total += product.currentPrice
              return (
                <Item key={idx}>
                  <Item.Image size="tiny" src={product.imageUrl} />
                  <Item.Content verticalAlign="middle">
                    <Item.Header>{product.name}</Item.Header>
                    <Item.Meta>{'Size: ' + cartItem.sizes[idx]} </Item.Meta>
                    <Item.Meta>
                      <span> {priceFormat(product.currentPrice)}</span>
                      <span>
                        <RemoveFromCartButton
                          cart={cartItem}
                          idx={idx}
                          loggedIn={isLoggedIn}
                        />
                      </span>
                    </Item.Meta>
                  </Item.Content>
                </Item>
              )
            }
          })}
        </Item.Group>
        <Divider />
        <Item.Group>
          <Item>
            <Item.Header>Total: {priceFormat(total)}</Item.Header>
          </Item>
        </Item.Group>
        <Segment color="black" inverted />
        <CheckoutModal />
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart || [],
    userId: state.user.id
  }
}

export default connect(mapStateToProps)(CartModal)
