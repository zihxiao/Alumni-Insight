import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button,
  NavItem, Modal,
} from 'react-bootstrap';

import withToast from './withToast.jsx';
import graphQLFetch from './graphQLFetch.js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {username: null, password: null},
      showing: false,
      fade: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      user: { ...prevState.user, [name]: value },
    }));
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { showError } = this.props;
    const form = document.forms.logIn;
    const username = form.username.value;
    const password = form.password.value;

    const query = `mutation login(
      $username: String!
      $password: String!
    ) {
      login(
        username: $username
        password: $password
      ) {
        id username email school schoolID token
      }
    }`

    const data = await graphQLFetch(query, { username, password }, showError);
    const { getUserData } = this.props;
    if (data) {
      const {id, username, email, school, schoolID, token} = data.login;
      localStorage.setItem('jwtToken', token);
      getUserData({id, username, email, school, schoolID, signIn: true});
      const { history } = this.props;
      history.push(`/profile/${data.login.id}`);
    }
  }

  render() {
    const {user: {username, password }} = this.state;
    const { showing } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          Sign In
        </NavItem>
        <Modal show={showing} onHide={this.hideModal} bsSize='sm' style={{opacity:1}}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="logIn" horizontal>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="username"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              bsStyle="primary"
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
            <Button bsStyle="primary" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withToast(SignIn);
