/* eslint max-len: 0 */
/* eslint no-alert: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';
import ProfilePageHeader from './components/Headers/ProfilePageHeader.jsx';

function onBeforeSaveCellAsync(row, cellName, cellValue, done) {
  // if your validation is async, for example: you want to pop a confirm dialog for user to confim
  // in this case, react-bootstrap-table pass a callback function to you
  // you are supposed to call this callback function with a bool value to perfom if it is valid or not
  // in addition, you should return 1 to tell react-bootstrap-table this is a async operation.

  // I use setTimeout to perform an async operation.
  // setTimeout(() => {
  //   done(true);  // it's ok to save :)
  //   done(false);   // it's not ok to save :(
  // }, 3000);
  // return 1;  // please return 1
}


export default class UserList extends React.Component {
  static async fetchData(match, search, showError) {
    const vars = {};
    const query = `query users(
      $schoolID: Int
    ) {
        users (schoolID: $schoolID){
          id username email firstname lastname address city zip school country
        }
      
    }`;

    const data = await graphQLFetch(query,vars,showError);
    return data;
  }
  constructor(props) {
    super();
    const users = null;
    const user = null;
    this.state = {
      users,
      user,
    };
    this.handlerClickCleanFiltered = this.handlerClickCleanFiltered.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
  }

  
  componentDidMount() {
    const { users } = this.state;
    if(users == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
      match: { params: { id: prevId } },
    } = prevProps;
    const { location: { search }, match: { params: { id } } } = this.props;
    if (prevSearch !== search || prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search }, match, showError } = this.props;
    
    const data = await UserList.fetchData(match, search, showError);
    if (data) {
      this.setState({
        users: data.users,
      });
    }
  }

  CellFormatter(cell, row) {
    return (<div><a href={"user/"+row.id}>{cell}</a></div>);
  }

  handlerClickCleanFiltered() {
    this.refs.school.cleanFiltered();
    this.refs.zip.cleanFiltered();
    this.refs.country.cleanFiltered();
    this.refs.city.cleanFiltered();
  }

  async onAfterSaveCell(row, cellName, cellValue) {
    alert(`Save cell ${cellName} with value ${cellValue}`);
    const vars = {};
    vars.userID = parseInt(row.id,10);
    const query3 = `query user1($id: Int!) {
      user1 (id: $id) {
        id username password address email zip city school firstname lastname country schoolID
      }
  }`;
  const data3 = await graphQLFetch(query3, { id: parseInt(vars.userID, 10) });
  if(data3){
    this.setState({ user: data3.user1 });
  }

    const user = this.state.user;
    user[cellName] = cellValue;
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
  
  onBeforeSaveCell(row, cellName, cellValue) {
    return true;
  }

  async onAfterDeleteRow(rowKeys) {
    const query = `mutation userDelete($id: Int!) {
      userDelete(id: $id)
    }`;
    const { users } = this.state;
    const { id } = users[rowKeys];
    const data = await graphQLFetch(query, { id: parseInt(id, 10) } );
    // if(data && data.userDelete){
    //   this.setState((prevState) => {
    //     const newList = [...prevState.users];
    //     newList.splice(rowKeys, 1);
    //     return { users: newList };
    //   });
    //   history.go();
    // }
  }
  
  render() {
  const options = {
    afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
  };

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
    afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
  };


  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
  };

  const userListStyle = {
    marginLeft: 100,
    marginRight: 100,
  }

    return (
      <div style={userListStyle}>
        <React.Fragment>
        <ProfilePageHeader />
        <h1>Welcome!</h1>
        
        <button><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { color: '#00ccff', cursor: 'pointer' } }>clear filters</a></button>
        <h4>Grey fields indicates fileds are non-editable</h4>
        <BootstrapTable version='4' options={ options } search={ true } data={ this.state.users } pagination  deleteRow={ true } cellEdit={ cellEditProp } selectRow={ selectRowProp } >
            <TableHeaderColumn dataSort={ true } width="90" dataField='id' isKey={ true } columnClassName='td-column-string-example' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>ID</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="90" dataField='username' columnClassName='td-column-string-example' editable={ false } dataFormat={this.CellFormatter}>User Name</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="90" dataField='firstname' columnClassName='td-column-string-example' editable={ false }>First Name</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="90" dataField='lastname' columnClassName='td-column-string-example' editable={ false }>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="160" dataField='email' columnClassName='td-column-string-example' editable={ false } >Email</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="180" dataField='address'>Address</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="110" dataField='city' ref='city' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>City</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="110" dataField='country' ref='country' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>Country</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="110" dataField='zip' ref='zip' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>Zip</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } ref='school' dataField='school' columnClassName='td-column-string-example' editable={ false } filter={ { type: 'RegexFilter', delay: 1000 } }>University</TableHeaderColumn>
        </BootstrapTable>
        </React.Fragment>
      </div>
    );
  }
}
