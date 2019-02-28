import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, Item, Dropdown, Button, Icon} from 'semantic-ui-react'
import {shirts} from '../store/singleProduct'
import AddToCartButton from './addToCartButton'

const priceHelper = price => {
  let ret = `$${price}`
  return ret.slice(0, ret.length - 2) + '.' + ret.slice(ret.length - 2)
}

class singleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    const {singleProduct} = this.props

    return (
      <div>
        <Item.Group>
          <Item>
            <Item.Image size="medium" src={singleProduct.imageUrl} rounded />

            <Item.Content>
              <Item.Header>
                {singleProduct.name} for {singleProduct.console}
              </Item.Header>

              <Item.Description>{singleProduct.description}</Item.Description>

              <Item.Meta>
                {
                  <div>
                    <span>{priceHelper(singleProduct.currentPrice)}</span>
                  </div>
                }
              </Item.Meta>
              <AddToCartButton product={singleProduct} />
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(shirts(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleProduct)
