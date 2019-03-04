import React, {Component} from 'react'
import {Navbar, AllShirts, singleProduct, Footer, orderList} from './components'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {shirts} from './store/products'
import {getCart} from './store/cart'
import {getOrders} from './store/orderHistory'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    this.props.getCart(this.props.user.id)
    this.props.user.id && this.props.getOrders(this.props.user.id)
    return (
      <div style={{overflowX: 'hidden', overflowY: 'scroll', height: '80vh'}}>
        <Navbar />
        <main
          className="ui main text"
          style={{paddingLeft: '3rem', paddingRight: '3rem'}}
        >
          <Switch>
            <Route exact path="/" component={AllShirts} />
            <Route exact path="/products" component={AllShirts} />
            <Route path="/products/:id" component={singleProduct} />
            <Route path="/orders" component={orderList} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(shirts()),
    getCart: id => dispatch(getCart(id)),
    getOrders: id => dispatch(getOrders(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
