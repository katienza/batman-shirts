import React from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Modal,
  Input,
  Header,
  Item,
  Icon,
  Divider,
  Segment
} from 'semantic-ui-react'
import CheckoutModal from './checkout'
import {setQuantity} from '../store/cart'
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
  let total = 0

  return (
    <Modal
      trigger={
        <Button id="navbar-cart-modal">
          <Icon name="shopping cart" size="large" />
        </Button>
      }
      closeIcon
      style={{overflowX: 'hidden'}}
    >
      <Header icon="shopping cart" content="Shopping Cart" />
      <h3>You have ordered: </h3>
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
                      <br />
                      {/* { <span id="quantity-container">
                        {'Choose a quantity: '}
                        <Input
                          value={product.quantity}
                          onChange={e =>
                            this.props.handleChange(product.id, e.target.value)
                          }
                          type="number"
                          min="1"
                        /> }
                      </span> */}
                      <span id="remove-cart-container">
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

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (id, quantity) => dispatch(setQuantity(id, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
