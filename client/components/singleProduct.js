import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Item, Button, Dropdown} from 'semantic-ui-react'
import {shirts} from '../store/singleProduct'
import AddToCartButton from './addToCartButton'

const priceFormat = price => {
  let displayPrice = `$${price}`
  return (
    displayPrice.slice(0, displayPrice.length - 2) +
    '.' +
    displayPrice.slice(displayPrice.length - 2)
  )
}

const getSizesOptions = product =>
  product.sizes.map((size, idx) => ({
    key: idx,
    text: size,
    value: idx
  }))

class singleProduct extends Component {
  constructor(props) {
    super(props)

    this.routeChange = this.routeChange.bind(this)
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  routeChange() {
    let path = `/products`
    this.props.history.push(path)
  }

  render() {
    const {singleProduct} = this.props

    if (Object.keys(singleProduct).length === 0) {
      return <div />
    }

    return (
      <div>
        <Button
          id="allshirtssingleview-btn"
          icon="left arrow"
          onClick={this.routeChange}
          align="left"
          circular
          style={{verticalAlign: 'middle'}}
        />
        <div className="ui text container">
          <Item.Group>
            <Item>
              <Item.Image size="medium" src={singleProduct.imageUrl} rounded />

              <Item.Content>
                <Item.Header>{singleProduct.name}</Item.Header>

                <Item.Description>
                  Product Description: {singleProduct.description}
                </Item.Description>

                <Dropdown
                  clearable
                  placeholder="Sizes"
                  options={getSizesOptions(singleProduct)}
                  simple
                  item
                />

                <Item.Meta>
                  {
                    <div>
                      <span>{priceFormat(singleProduct.currentPrice)}</span>
                    </div>
                  }
                </Item.Meta>

                <AddToCartButton product={singleProduct} />
                {/* <Button
                onClick={this.routeChange}
                align="center"
                circular
                style={{verticalAlign: 'middle'}}
              >
                Continue Shopping
              </Button> */}
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
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
