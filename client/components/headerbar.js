import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Image, Button} from 'semantic-ui-react'

const HeaderBar = props => {
  let date = new Date().getFullYear()

  return (
    <Menu id="headerbar" size="mini" borderless>
      <Menu.Item as={Link} to="/">
        <Image
          circular
          size="tiny"
          centered
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sW4v0GX7vobFgQe2WIU0KzUkbW1pvbJH5OVlOk9PLdmnkot-ow"
        />
      </Menu.Item>
      {<div id="headerbar-title">Batguys {date}</div>}
      {props.isLoggedIn && (
        <Menu.Item>
          <Button inverted onClick={props.handleClick}>
            Logout
          </Button>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(HeaderBar)

/**
 * PROP TYPES
 */
HeaderBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
