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
      <Segment secondary style={{padding: '1em 0em'}}>
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
                      <Button color="green" onClick={this.handleClose} inverted>
                        <Icon name="checkmark" /> Got it
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Modal
                    trigger={<Button>Contact me</Button>}
                    header="Contact the Engineer"
                    content="If you enjoyed this e-commerce platform, you can reach me at atienza.ken@gmail.com"
                    actions={[{key: 'done', content: 'Done', positive: true}]}
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
