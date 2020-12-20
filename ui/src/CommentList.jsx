/* eslint max-len: 0 */
/* eslint no-alert: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn, ClearSearchButton } from 'react-bootstrap-table';
import graphQLFetch from './graphQLFetch.js';


export default class CommentList extends React.Component {
  static async fetchData(schoolID, showError) {
    const vars = {};
    vars.schoolID = parseInt(schoolID,10);
    // const { params: { id } } = match;
    // const idInt = parseInt(id, 10);

    const query = `query comments(
      $schoolID: Int) {
      comments(schoolID: $schoolID) {
        id content schoolID rating
      }
    }`;


    const data = await graphQLFetch(query, vars, showError);
    return data;
  }
  constructor(props) {
    const comments = null;
    const schools = null;
    super();
    this.state = {
      schools,
      comments,
    };
    this.handlerClickCleanFiltered = this.handlerClickCleanFiltered.bind(this);
    this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
  }

  
  componentDidMount() {
    const { comments } = this.state;
    if(comments == null) this.loadData();
  }


  async loadData() {
    const { schoolID, showError } = this.props;
    const data = await CommentList.fetchData(schoolID,showError);
    if (data) {
      this.setState({
        comments: data.comments,
      });
    }
  }

  onAfterDeleteRow(rowKeys) {
    alert('The id of school you remove: ' + rowKeys);
  }

  handlerClickCleanFiltered() {
    this.refs.content.cleanFiltered();
    this.refs.rating.cleanFiltered();
  }


  render() {
    const options = {
      afterDeleteRow: this.onAfterDeleteRow,  // A hook for after droping rows.
      deleteText: 'Remove from View',
    };
    
    // If you want to enable deleteRow, you must enable row selection also.
    const selectRowProp = {
      mode: 'checkbox'
    };

  
    
    return (

      <React.Fragment>
        <h3>Alumni's Opinion!</h3>
      <button onClick={ this.handleBtnClick }><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { color: '#00ccff', cursor: 'pointer' } }>clear filters</a></button>
      <BootstrapTable version='4' options = { options } data={ this.state.comments } pagination >
          <TableHeaderColumn dataSort={ true } width="140" isKey={ true } dataField='content' ref='content' filter={ { type: 'RegexFilter', delay: 1000 } }>Content</TableHeaderColumn>
          <TableHeaderColumn dataSort={ true } width="160" ref='rating' dataField='rating'>Alumni Rating</TableHeaderColumn>
      </BootstrapTable>
      </React.Fragment>
    );
  }
}
