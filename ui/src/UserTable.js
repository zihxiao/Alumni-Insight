/* eslint max-len: 0 */
/* eslint no-alert: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import graphQLFetch from './graphQLFetch.js';

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

async function onAfterSaveCell(row, cellName, cellValue,) {
  e.preventDefault();
  alert(`Save cell ${cellName} with value ${cellValue}`);
  const query2 = `mutation userUpdate(
    $id: Int!
    $changes2: UserUpdateInputs!
  ){ userUpdate(
    id: $id
    changes2: $changes2 ){
    address city zip firstname lastname country
    }
  }`;
  var {id, ...changes2} = user;
  const data2 = await graphQLFetch(query2, {changes2, id: parseInt(id, 10) });
  if(data2){
    this.setState({ user: data2.userUpdate });
    alert('Updated user profile successfully');
  }
  const { history } = this.props;
  history.go();
}

function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

export default class UserTable extends React.Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      users,
    };
    // this.onBeforeSaveCell  = this.onBeforeSaveCell.bind(this);
    // this.onAfterSaveCell  = this.onAfterSaveCell.bind(this);
  }


  render() {

    return (
      
      <BootstrapTable version='4' search={ true } data={ this.state.users } pagination  deleteRow={ true } cellEdit={ cellEditProp } selectRow={ selectRowProp } >
          <TableHeaderColumn dataSort={ true } width="100" dataField='id' isKey={ true } columnClassName='td-column-string-example' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>ID</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="130" dataField='username' columnClassName='td-column-string-example' editable={ false } dataFormat={this.CellFormatter}>User Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="130" dataField='firstname' columnClassName='td-column-string-example' editable={ false }>First Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="130" dataField='lastname' columnClassName='td-column-string-example' editable={ false }>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="160" dataField='email' columnClassName='td-column-string-example' editable={ false } >Email</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="300" dataField='address'>Address</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="140" dataField='city' ref='city' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>City</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="140" dataField='country' ref='country' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>Country</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="140" dataField='zip' ref='zip' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>Zip</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } ref='school' dataField='school' columnClassName='td-column-string-example' editable={ false } filter={ { type: 'RegexFilter', delay: 1000 } }>University</TableHeaderColumn>
      </BootstrapTable>
   
    );
  }
}
