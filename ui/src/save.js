import React from 'react';
// import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import {
//   Col, Panel, Form, FormGroup, FormControl, ControlLabel,
//   ButtonToolbar, Button, Alert,
// } from 'react-bootstrap';
import {
  Container,
} from "reactstrap";

import graphQLFetch from './graphQLFetch.js';
import withToast from './withToast.jsx';
import CommentAdd from './CommentAdd.jsx';
import CommentList from './CommentList.jsx';
import UserContext from "./UserContext.js";
import URLSearchParams from 'url-search-params';


// import Rating from "components/Rating/Rating.jsx";

class SchoolDetail extends React.Component {
constructor(props) {
    super(props);
    const school = null;
    const comment = null;
    const schoolID = null;
    this.state = { 
      schoolID,
      school, 
      comment,
      user: {},
     };
    this.createComment = this.createComment.bind(this);
  }

  componentDidMount() {
    const { school, comment } = this.state;
    if (school == null) this.loadData();
    if (comment == null) this.loadData();
    this.setState({user: this.props.user});
  }

  componentDidUpdate(prevProps) {
  
    if (prevProps.user !== this.props.user) {
      this.setState({user: this.props.user});
      this.loadData();
    }
  }


  async loadData() {
  const vars1 = {};
  vars1.schoolID = this.props.schoolID;
  alert(vars1.schoolID);
  const query1 = `query comments(
      $schoolID: Int
    ){
      comments(
        schoolID: $schoolID
    ){
        id content schoolID userID rating
      }
    }`;
  var data1 = await graphQLFetch(query1, vars1);
  if (data1) {
    this.setState({ comments: data1.comments });
  }
    
    const query = `query school($id: Int!) {
      school(id: $id) {
        id name address state zip
        website
      }
    }`;
    var id = parseInt(this.props.schoolID,10)
    var data = await graphQLFetch(query, { id: parseInt(id, 10) });
    alert(JSON.stringify(data),null,4);
    this.setState({ school: data ? data.school : {} });
  }

  async createComment(comment) {
    comment.schoolID = parseInt(this.props.schoolID,10);

    comment.userID = parseInt(this.props.user.id,10);

    const query2 = `mutation commentAdd($comment: CommentInputs!) {
       commentAdd(comment: $comment){
      id schoolID userID content rating
    }
  }`;
    
    const data3 = await graphQLFetch(query2, {comment});
    if (data3) {
      alert('Add comment successfully');
      const { history } = this.props;
      this.loadData();
      history.go();
    }
  }

  render() {
    const { school } = this.state;
    if (school == null) return null;

    const { school: { id } } = this.state;

    const { school: { name, address } } = this.state;
   
    const { school: { state, zip, website } } = this.state;
    return (
      
      <React.Fragment>
          <div className="section profile-content">
            <table className="table table-striped">
            <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">School Name</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{address}</td>
                </tr>
                <tr>
                  <th scope="row">State</th>
                  <td>{state}</td>
                </tr>
                <tr>
                  <th scope="row">Zip Code</th>
                  <td>{zip}</td>
                </tr>
                <tr>
                  <th scope="row">Official Website</th>
                  <td>{website}</td>
                </tr>           
                </tbody>
              </table>
            <CommentList schoolID = {this.props.schoolID} />
            <CommentAdd schoolID = {this.props.schoolID} history = {this.props.history} createComment={this.createComment}/>
          </div>    
          </React.Fragment>
    );
  }
}


SchoolDetail.contextType = UserContext;
export default SchoolDetail;
