import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button,
  Panel,
} from 'react-bootstrap';
import SelectAsync from 'react-select/lib/Async'; 
import { withRouter } from 'react-router-dom';
import ProfilePageHeader from './components/Headers/ProfilePageHeader.jsx';
import withToast from './withToast.jsx';
import graphQLFetch from './graphQLFetch.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: null,
        password: null,
        confirmPassword: null,
        email: null,
        school: null,
        schoolID: null,
        address: null,
        zip: null,
        city: null,
      }
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeSchool = this.onChangeSchool.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      user: { ...prevState.user, [name]: value },
    }));
  }

  onChangeSchool({ value }) {
    this.setState(prevState => (
      {
        user : {
          ...prevState.user,
          school: value.school,
          schoolID: value.schoolID,
        }
      }
    )
    );
  }

  async loadOptions(term) {
    if (term.length < 3) return [];
    const query = `query schoolList($search: String) {
      schoolList(search: $search) {
        schools {id name}
      }
    }`;

    const { showError } = this.props;
    const data = await graphQLFetch(query, { search: term }, showError);
    return data.schoolList.schools.map(school => ({
      label: `${school.name}`, value: {school: school.name, schoolID: school.id},
    }));
  }
 
  async handleSubmit(e) {
    e.preventDefault();
    const registerInputs = this.state.user;

    const query = `mutation register($registerInputs: RegisterInputs!) {
      register(registerInputs: $registerInputs) {
        id username email school schoolID
      }
    }`

    const { showError } = this.props;
    const data = await graphQLFetch(query, { registerInputs }, showError);
    if (data) {
      const { history } = this.props;
      alert("Register successfully")
      history.push(`/`);
    }
  }

  render() {
    const registrationStyle = {
      marginLeft: 200,
      marginRight: 200,
      marginTop: 100,
      marginBottom: 80,
    }
    return (
    <React.Fragment>
      <br></br>
      <br></br>
      <div style={registrationStyle}>
        <Panel>
          <h2>Registration</h2>
          <br></br>
          <br></br>
          <Panel.Body>
            <Form name="register" horizontal>
              <FormGroup>
                <ControlLabel>Username (Required field)</ControlLabel>
                <FormControl
                type="username"
                name="username"
                onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email (Required field)</ControlLabel>
                <FormControl
                type="email"
                name="email"
                onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password (Required field)</ControlLabel>
                <FormControl
                type="password"
                name="password"
                onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm password (Required field)</ControlLabel>
                <FormControl
                type="password"
                name="confirmPassword"
                onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Address(Optional)</ControlLabel>
                <FormControl
                type="address"
                name="address"
                onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Zip(Optional)</ControlLabel>
                <FormControl
                type="zip"
                name="zip"
                onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>City(Optional)</ControlLabel>
                <FormControl
                type="city"
                name="city"
                onChange={this.onChange}
                />
              </FormGroup>
            </Form>
            <h9>Search by typing your univeristy's name below (Required field)</h9>
            <SelectAsync
              instanceId="search-select"
              loadOptions={this.loadOptions}
              filterOption={() => true}
              onChange={this.onChangeSchool}
              components={{ DropdownIndicator: null }}
            />
            <br></br>
            <br></br>
            <Button
              type="button"
              bsStyle="primary"
              onClick={this.handleSubmit}
            >
              
              Submit
            </Button>
          </Panel.Body>
        </Panel>
      </div>
   </React.Fragment>
    );
  }
}

export default withToast(withRouter(Register));