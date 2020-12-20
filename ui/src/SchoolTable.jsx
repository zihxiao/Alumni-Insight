import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table } from 'react-bootstrap';

import UserContext from './UserContext.js';

// eslint-disable-next-line react/prefer-stateless-function
class SchoolRowPlain extends React.Component {
  render() {
    const {
      school, location: { search }, deleteSchool, index,
    } = this.props;
    // const user = this.context;
    const selectLocation = { pathname: `/schools/${school.id}`, search };

    function onDelete(e) {
      e.preventDefault();
      deleteSchool(index);
    }

    const tableRow = (
      <tr>
        <td>{school.id}</td>
        <td>{school.name}</td>
        <td>{school.state}</td>
        <td>{school.zip}</td>
        <td>{school.website}</td>
        <td>
          <Link to={`/edit/${school.id}`}>Edit</Link>
          {/* {' | '}
          <Link to={`/detail/${school.id}`}>Select</Link> */}
          {' | '}
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );

    return (
      <LinkContainer to={selectLocation}>
        {tableRow}
      </LinkContainer>
    );
  }
}

SchoolRowPlain.contextType = UserContext;
const SchoolRow = withRouter(SchoolRowPlain);
delete SchoolRow.contextType;

export default function SchoolTable({ schools, deleteSchool }) {
  const schoolRows = schools.map((school, index) => (
    <SchoolRow
      key={school.id}
      school={school}
      deleteSchool={deleteSchool}
      index={index}
    />
  ));

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>University Name</th>
          <th>State</th>
          <th>Zip</th>
          <th>Website</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {schoolRows}
      </tbody>
    </Table>
  );
}
