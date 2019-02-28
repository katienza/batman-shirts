import React from 'react'
import {connect} from 'react-redux'
import {Item, Segment, Header} from 'semantic-ui-react'

const priceHelper = price => {
  let ret = `$${price}`
  return `${ret.slice(0, ret.length - 2) + '.' + ret.slice(ret.length - 2)}`
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
                      <span>{priceHelper(orders.checkoutPrice)}</span>
                    </div>
                    <span>{orders.createdAt.slice(0, 10)}</span>
                    <div> Shipped to: {orders.address} </div>
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
