import React from 'react'
import {connect} from 'react-redux'
import {Item, Dropdown, Button} from 'semantic-ui-react'
import {cartAdder} from '../store/cart'
import {Link} from 'react-router-dom'
import AddToCartButton from './addToCartButton'

const getSizesOptions = product =>
  product.sizes.map((size, idx) => ({
    key: idx,
    text: size,
    value: idx
  }))

const routeChange = history => {
  let path = `/`
  history.push(path)
}

export const AllShirtsSingleView = props => {
  return (
    <div>
      <div>
        <Button
          id="allshirtssingleview-btn"
          icon="left arrow"
          onClick={() => routeChange(props.history)}
          align="left"
          circular
          style={{verticalAlign: 'middle'}}
        />
        <span id="allshirtssingleview-text-title">
          Batman T-Shirt options
          <br />
          <span id="allshirtssingleview-text-description">
            As requested, here are a few options I sourced for you. I think
            you'll like these options.
          </span>
        </span>
      </div>
      <Item.Group id="allshirtssingleview-grid" divided>
        {props.products.map(product => {
          return (
            <Item key={product.id}>
              <Item.Image
                src={product.imageUrl}
                as={Link}
                to={'./products/' + product.id}
              />
              <Item.Content>
                <div className="product name and price">
                  <Item.Meta id="allshirtssingleview-option">
                    OPTION {product.id}
                  </Item.Meta>
                  <Item.Header id="allshirtssingleview-card-header">
                    {product.name}
                  </Item.Header>
                  <Item.Extra>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Vulputate odio ut enim blandit volutpat maecenas
                    volutpat blandit. Velit dignissim sodales ut eu sem integer
                    vitae. Fermentum leo vel orci porta non pulvinar neque
                    laoreet suspendisse.
                  </Item.Extra>
                  <Dropdown
                    id="allshirtssingleview-sizes"
                    clearable
                    placeholder="Sizes"
                    options={getSizesOptions(product)}
                    simple
                    item
                  />
                  <Item.Header>
                    <span id="allshirtssingleview-price">
                      {'$' +
                        product.currentPrice.toString().slice(0, -2) +
                        '.' +
                        product.currentPrice.toString().slice(-2)}
                    </span>
                  </Item.Header>
                  <div id="allshirtssingleview-btns">
                    <br />
                    <AddToCartButton product={product} />
                    <br />
                    <Button as={Link} to={'./products/' + product.id}>
                      I'd like a closer view
                    </Button>
                  </div>
                </div>
              </Item.Content>
            </Item>
          )
        })}
      </Item.Group>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => {
      dispatch(cartAdder(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllShirtsSingleView)
