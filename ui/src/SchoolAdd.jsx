import React from 'react';
import PropTypes from 'prop-types';

export default class SchoolAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.schoolAdd;
    const school = {
      name: form.name.value,
      address: form.address.value,
      zip: form.zip.value,
      website: form.website.value,
    };
    const { createSchool } = this.props;
    createSchool(school);
    form.name.value = ''; form.website.value = '';
  }

  render() {
    return (
      <form name="schoolAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="address" placeholder="Address" />
        <input type="text" name="zip" placeholder="ZipCode" />
        <input type="text" name="website" placeholder="Official Website" />
        <button type="submit">Add School</button>
      </form>
    );
  }
}

SchoolAdd.propTypes = {
  createSchool: PropTypes.func.isRequired,
};
