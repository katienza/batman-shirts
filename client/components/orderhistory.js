import React from 'react'
import {connect} from 'react-redux'
import {Item, Segment, Header} from 'semantic-ui-react'

const priceFormat = price => {
  let displayPrice = `$${price}`
  return `${displayPrice.slice(0, displayPrice.length - 2) +
    '.' +
    displayPrice.slice(displayPrice.length - 2)}`
}

const orderList = props => {
  const {orderHistory} = props

  return (
    <div>
      <Segment>
        <Header name="Past Transactions" />
        <Item.Group divided>
          {orderHistory.map(orders => {
            return (
              <Item key={orders.id}>
                <Item.Image size="tiny" src={orders.imageURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header>{orders.productName}</Item.Header>
                  <Item.Meta>
                    <div>
                      <span>{priceFormat(orders.checkoutPrice)}</span>
                    </div>
                    <span>{orders.createdAt.slice(0, 10)}</span>
                  </Item.Meta>
                </Item.Content>
              </Item>
            )
          })}
        </Item.Group>
      </Segment>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orderHistory: state.orderHistory
  }
}

export default connect(mapStateToProps)(orderList)
