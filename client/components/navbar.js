import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  Menu,
  Image,
  Dropdown,
  Icon,
  Search,
  Button,
  Label,
  Item
} from 'semantic-ui-react'
import CartModal from './cart'
import Routes from '../routes'

const Navbar = props => {
  return (
    <Menu inverted color="grey" size="mini" borderless>
      <Menu.Item as={Link} to="/">
        <Image
          circular
          size="tiny"
          centered
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sW4v0GX7vobFgQe2WIU0KzUkbW1pvbJH5OVlOk9PLdmnkot-ow"
        />
      </Menu.Item>
      <Menu.Item>
        <Routes />
      </Menu.Item>
      <Menu.Item>
        <CartModal />
      </Menu.Item>
      {props.isLoggedIn && (
        <Menu.Item>
          <Button inverted onClick={props.handleClick}>
            Logout
          </Button>
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
