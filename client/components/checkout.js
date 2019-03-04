import React from 'react'
import {
  Button,
  Modal,
  Icon,
  Form,
  Segment,
  Sidebar,
  Popup
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {finishOrder, finishOrderGuest} from '../store/cart'
import {postOrder, postGuestOrder} from '../store/orderHistory'

class CheckoutModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      visible: false,
      firstName: '',
      lastName: '',
      email: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangePayment = this.handleChangePayment.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleSubmit(event, user) {
    const {firstName, lastName} = this.state
    const userName = `${firstName}, ${lastName}`

    if (!this.props.user.hasOwnProperty('id')) {
      this.props.postGuestOrder(userName, this.state.email, this.props.cart)
      this.props.finishOrderGuest()
    } else {
      this.props.postOrder(userName, user, this.props.cart)
      this.props.finishOrder(user)
    }
    event.preventDefault()
    this.closeModal()
  }

  handleChangePayment(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  closeModal() {
    this.setState({showModal: false})
  }

  render() {
    const {showModal} = this.state

    return (
      <Modal
        onClose={this.closeModal}
        open={showModal}
        trigger={
          <Button onClick={() => this.setState({showModal: true})} color="blue">
            <Icon name="credit card outline" /> Proceed to checkout
          </Button>
        }
      >
        <Modal.Content>
          <Sidebar.Pushable color="blue" as={Segment}>
            <Sidebar.Pusher>
              <Form>
                <Form.Field width="six">
                  <label>Email</label>
                  <input
                    placeholder="Enter Email"
                    onChange={this.handleChangePayment}
                    name="email"
                  />
                </Form.Field>
                <Form.Field width="six">
                  <label>First Name</label>
                  <input
                    placeholder="Enter first name"
                    onChange={this.handleChangePayment}
                    name="firstName"
                  />
                </Form.Field>
                <Form.Field width="six">
                  <label>Last Name</label>
                  <input
                    placeholder="Enter last name"
                    onChange={this.handleChangePayment}
                    name="lastName"
                  />
                </Form.Field>
              </Form>
              <Popup
                content="Thank you for shopping with Batguys! An order confirmation has been sent to your email."
                on="click"
                trigger={
                  <Button
                    color="blue"
                    onClick={() => this.props.postGuestOrder(this.props.cart)}
                  >
                    Order Confirmation<Icon name="arrow alternate circle right outline" />
                  </Button>
                }
              />
              <Button color="blue" onClick={this.closeModal}>
                Continue Shopping
              </Button>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  finishOrder: userId => dispatch(finishOrder(userId)),
  finishOrderGuest: () => dispatch(finishOrderGuest()),
  postOrder: (userName, userId, cart) =>
    dispatch(postOrder(userName, userId, cart)),
  postGuestOrder: (userName, email, cart) =>
    dispatch(postGuestOrder(userName, email, cart))
})
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal)
