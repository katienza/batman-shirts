import React from 'react'
import {connect} from 'react-redux'
import {Card, Image, Grid, Dropdown} from 'semantic-ui-react'
import {cartAdder} from '../store/cart'
import AddToCartButton from './addToCartButton'

const getSizesOptions = product =>
  product.sizes.map((size, idx) => ({
    key: idx,
    text: size,
    value: idx
  }))

export const AllShirts = props => {
  return (
    <Grid container columns={5} doubling>
      {props.products.map(product => {
        return (
          <Grid.Column key={product.id}>
            <Card>
              <Image src={product.imageUrl} href={'./products/' + product.id} />
              <Card.Content>
                <div className="product name and price">
                  <Card.Header>{product.name}</Card.Header>
                  <Dropdown
                    clearable
                    placeholder="Sizes"
                    options={getSizesOptions(product)}
                    simple
                    item
                  />
                  <Card.Header>
                    {'$' +
                      product.currentPrice.toString().slice(0, -2) +
                      '.' +
                      product.currentPrice.toString().slice(-2)}
                    <AddToCartButton product={product} />
                  </Card.Header>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        )
      })}
    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllShirts)
