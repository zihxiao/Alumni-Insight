/* eslint max-len: 0 */
/* eslint no-alert: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';
import ProfilePageHeader from './components/Headers/ProfilePageHeader.jsx';

import withToast from './withToast.jsx';


class SchoolVisitPage extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('name')) vars.name = params.get('name');
    if (params.get('state')) vars.state = params.get('state');
    if (params.get('zip')) vars.zip = params.get('zip');
    if (params.get('rating')) vars.rating = params.get('rating');

    // const { params: { id } } = match;
    // const idInt = parseInt(id, 10);


    const query = `query schoolList2(
      $state: StateType
      $zip: String
    ) {
      schoolList2(
        state: $state
        zip: $zip
      ) {
        schools {
          id name address state zip
          website
        }
      }
    }`;

    const data = await graphQLFetch(query, vars, showError);
    return data;
  }
  constructor(props) {
    super();
    const schools = store.initialData ? store.initialData.schoolList2 : null;
    delete store.initialData;
    this.state = {
      schools,
    };
    this.handlerClickCleanFiltered = this.handlerClickCleanFiltered.bind(this);
    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
  }

  
  componentDidMount() {
    const { schools } = this.state;
    if(schools == null) this.loadData();
  }

  async loadData() {
    const { location: { search }, match, showError } = this.props;
    const data = await SchoolVisitPage.fetchData(match, search, showError);
    if (data) {
      this.setState({
        schools: data.schoolList2.schools,
      });
    }
  }

  onAfterDeleteRow(rowKeys) {
    alert('The id of school you remove: ' + rowKeys);
  }


  

  CellFormatter(cell, row) {
    return (<div><a href={"detail/"+row.id}>{cell}</a></div>);
  }

  handlerClickCleanFiltered() {
    this.refs.state.cleanFiltered();
    this.refs.zip.cleanFiltered();
    this.refs.rating.cleanFiltered();
  }


  


  render() {
    const options = {
      afterDeleteRow: this.onAfterDeleteRow,  // A hook for after droping rows.
      deleteText: 'Remove from View',
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '10 schools per page', value: 10
      }, {
        text: '50 schools per page', value: 50
      }, {
        text: '100 schools per page', value: 100
      }, ], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 6,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom'
    };
    
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox'
    };

    const visitPageStyle = {
      marginLeft: 100,
      marginRight: 100,
    }
    
    return (
      <div style={visitPageStyle}>
        <React.Fragment>
          <ProfilePageHeader  />
          <h1 >Welcome!</h1>
          <h3>Click on School name for detailed infomation, review Alumni's comment and add your comment!</h3>
        <button onClick={ this.handleBtnClick }><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { color: '#00ccff', cursor: 'pointer' } }>clear filters</a></button>
        <BootstrapTable version='4' search={ true } options = { options } data={ this.state.schools } pagination  deleteRow={ true } selectRow={ selectRowProp } >
            <TableHeaderColumn dataSort={ true } width="100" dataField='id' isKey={ true } tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>ID</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } dataField='name' dataFormat={this.CellFormatter}>University Name</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } dataField='address'>University Address</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="140" dataField='state' ref='state' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>State</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } width="140" dataField='zip' ref='zip' filter={ { type: 'TextFilter', delay: 1000, condition: 'eq' } }>Zip</TableHeaderColumn>
            
      
        </BootstrapTable>
        </React.Fragment>
      </div>
    );
  }
}

const SchoolVisitPageWithToast = withToast(SchoolVisitPage)
SchoolVisitPageWithToast.fetchData = SchoolVisitPage.fetchData;

export default SchoolVisitPage;
