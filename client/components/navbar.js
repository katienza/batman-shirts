import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Dropdown, Button} from 'semantic-ui-react'
import CartModal from './cart'
import Routes from '../routes'

const Navbar = props => {
  return (
    <Menu id="navbar" pointing stackable size="large" secondary borderless>
      <span id="navbar-menu-allT">
        <Menu.Item as={Link} to="/">
          ALL TEES
        </Menu.Item>
      </span>
      <span id="navbar-menu-funnyTees">
        <Menu.Item as={Link} to="/products">
          FUNNY TEES
        </Menu.Item>
      </span>
      <Menu.Item>
        <Routes />
      </Menu.Item>
      <Menu.Item position="right">
        <CartModal />
      </Menu.Item>
      {props.isLoggedIn && (
        <Menu.Item>
          <Button onClick={props.handleClick}>Logout</Button>
        </Menu.Item>
      )}
      {props.isLoggedIn && (
        <Menu.Item>
          <Dropdown button icon="user">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/orders" text="Past Orders" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
    </Menu>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
