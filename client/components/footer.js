import React, {Component} from 'react'
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
  Button,
  Icon,
  Modal
} from 'semantic-ui-react'

export default class Footer extends Component {
  state = {modalOpen: false}
  handleOpen = () => this.setState({modalOpen: true})
  handleClose = () => this.setState({modalOpen: false})

  render() {
    return (
      <Segment className="footer" secondary style={{zIndex: 999}}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row centered>
              <Grid.Row>
                <List link inverted>
                  <Modal
                    trigger={
                      <Button onClick={this.handleOpen}>Architect</Button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size="small"
                  >
                    <Header
                      icon="user circle"
                      content="Designed & Engineered by"
                    />
                    <Modal.Content>
                      <h3>Ken Atienza</h3>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color="grey" onClick={this.handleClose} inverted>
                        <Icon name="checkmark" /> Got it
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Modal
                    trigger={<Button>Contact me</Button>}
                    header="Contact the Engineer"
                    content={
                      <div>
                        <p>
                          If you enjoyed my e-commerce platform, tell me what
                          you liked through{' '}
                          <a href="mailto:atienza.ken@gmail.com">here</a>
                        </p>
                      </div>
                    }
                    actions={[
                      {
                        key: 'done',
                        content: 'Done',
                        positive: true,
                        color: 'grey'
                      }
                    ]}
                  />
                </List>
              </Grid.Row>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    )
  }
}
