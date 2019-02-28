import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Card, Image, Grid, Button, Icon} from 'semantic-ui-react'
import {cartAdder} from '../store/cart'
import AddToCartButton from './addToCartButton'

export const AllShirts = props => {
  return (
    <Grid container columns={5} doubling>
      {props.products.map(product => {
        return (
          <Grid.Column key={product.id}>
            <Card style={{width: '200px'}}>
              <Image
                height="250px"
                width="300px"
                src={product.imageUrl}
                href={'./products/' + product.id}
              />
              <Card.Content>
                <div className="product name and price">
                  <Card.Header>{product.name}</Card.Header>
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
