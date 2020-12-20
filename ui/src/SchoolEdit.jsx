/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import { Alert } from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import TextInput from './TextInput.jsx';
import withToast from './withToast.jsx';
import ProfilePageHeader from './components/Headers/ProfilePageHeader.jsx';

class SchoolEdit extends React.Component {
  static async fetchData(match, search, showError) {
    const query = `query school($id: Int!) {
      school(id: $id) {
        id name address state zip website
      }
    }`;

    const { params: { id } } = match;
    const result = await graphQLFetch(query, { id: parseInt(id, 10) }, showError);
    return result;
  }

  constructor() {
    super();
    const school = null;
    this.state = {
      school,
      invalidFields: {},
      showingValidation: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
  }

  componentDidMount() {
    const { school } = this.state;
    if (school == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      school: { ...prevState.school, [name]: value },
    }));
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.showValidation();
    const { school, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;

    const query = `mutation schoolUpdate(
      $id: Int!
      $changes: SchoolUpdateInputs!
    ) {
      schoolUpdate(
        id: $id
        changes: $changes
      ) {
        id name address state zip website
      }
    }`;
    const { id, ...changes } = school;
    const { showSuccess, showError } = this.props;
    const data = await graphQLFetch(query, { changes, id: parseInt(id, 10) }, showError);
    if (data) {
      this.setState({ school: data.schoolUpdate });
      alert('Updated school information successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const { match, showError } = this.props;
    const data = await SchoolEdit.fetchData(match, null, showError);
    this.setState({ school: data ? data.school : {}, invalidFields: {} });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  render() {
    const { school } = this.state;
    if (school == null) return null;

    const { school: { id } } = this.state;
    // const { match: { params: { id: propsId } } } = this.props;
    // if (id == null) {
    //   if (propsId != null) {
    //     return <h3>{`School with ID ${propsId} not found.`}</h3>;
    //   }
    //   return null;
    // }

    const { invalidFields } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0) {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          Please correct invalid fields before submitting.
        </Alert>
      );
    }

    const { school: { name, address, state } } = this.state;
    const { school: { zip, website } } = this.state;

    const editStyle= {
      marginLeft: 200,
      marginRight: 200,
      marginTop: 100,
      marginBottom: 80,
    }
    return (
      <div style={editStyle}>
        <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h3>{`Editing school: ${name}   `}for Administration only</h3>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  <TextInput
                    size={50}
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    key={id}
                  />
                </td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>
                  <TextInput
                    size={50}
                    name="address"
                    value={address}
                    onChange={this.onChange}
                    key={id}
                  />
                </td>
              </tr>
              <tr>
                <td>State:</td>
                <td>
                  <select name="state" value={state} onChange={this.onChange}>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DC</option>
                    <option value="DE">DE</option>
                    <option value="DE">FM</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>
                    <option value="MS">MP</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="PA">PR</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Zip:</td>
                <td>
                  <TextInput
                    size={50}
                    name="zip"
                    value={zip}
                    onChange={this.onChange}
                    key={id}
                  />
                </td>
              </tr>
              <tr>
                <td>Website:</td>
                <td>
                  <TextInput
                    size={50}
                    name="website"
                    value={website}
                    onChange={this.onChange}
                    key={id}
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td><button type="submit">Submit</button></td>
              </tr>
            </tbody>
          </table>
          {validationMessage}
        </form>
        </React.Fragment>
      </div>
    );
  }
}

const SchoolEditWithToast = withToast(SchoolEdit);
SchoolEditWithToast.fetchData = SchoolEdit.fetchData;

export default SchoolEditWithToast;
