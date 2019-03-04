import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Form,
  Button,
  Modal,
  Segment,
  Grid,
  Message,
  Icon
} from 'semantic-ui-react'
import {GoogleLogin} from 'react-google-login'

/**
 * COMPONENT

const responseGoogle = response => {
  console.log(response)
}

/*
const AuthForm = props => {
  const {displayName, handleSubmit, error} = props

  return (
    <div>
      <Modal
        trigger={<Button id="auth-form-login">Login | Signup</Button>}
        closeIcon
      >
        <Modal.Content>
          <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable verticalAlign="middle">
              <Grid.Column>
                <Form unstackable onSubmit={handleSubmit} name="login">
                  <Form.Input
                    name="email"
                    label="email"
                    placeholder="email"
                    type="text"
                  />
                  <Form.Input
                    name="password"
                    label="password"
                    placeholder="password"
                    type="password"
                  />
                  <Form.Button content="Login" primary type="submit" />
                </Form>
              </Grid.Column>

              <Grid.Column stretched>
                <Form unstackable onSubmit={handleSubmit} name="signup">
                  <Form.Input
                    name="email"
                    label="email"
                    placeholder="email"
                    type="text"
                  />
                  <Form.Input
                    name="password"
                    label="password"
                    placeholder="password"
                    type="password"
                  />
                  <Form.Input
                    label="firstName"
                    name="firstName"
                    placeholder="firstName"
                    type="string"
                  />

                  <Form.Input
                    label="lastName"
                    name="lastName"
                    placeholder="lastName"
                    type="string"
                  />

                  <Form.Button content="Signup" primary type="submit" />
                </Form>
              </Grid.Column>
              {error ? (
                <Message attached="bottom" warning>
                  <Icon name="warning sign" />
                  {error &&
                    error.response && <div> {error.response.data} </div>}
                </Message>
              ) : (
                <Message attached="bottom" warning hidden>
                  <Icon name="warning sign" />
                  {error &&
                    error.response && <div> {error.response.data} </div>}
                </Message>
              )}
            </Grid>
          </Segment>
        </Modal.Content>
      </Modal>
    </div>
  )
}
/**
  <GoogleLogin
    clientId="116286742111-55fq55eqqfkfj122hit40rn9k7hkdlav.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let firstName = ''
      let lastName = ''
      if (formName === 'signup') {
        firstName = evt.target.firstName.value
        lastName = evt.target.lastName.value
      }
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
*/
