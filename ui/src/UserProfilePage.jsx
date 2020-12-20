/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/* eslint-disable no-unused-vars */
import React from 'react';
import graphQLFetch from './graphQLFetch.js';

import { FormInputs } from "./components/FormInputs/FormInputs.jsx";
import Button from "./components/CustomButton/CustomButton.jsx";
import ProfilePageHeader from "./components/Headers/ProfilePageHeader.jsx";
import Rating from "./components/Rating/Rating.jsx";
import UserContext from "./UserContext.js";
import store from './store.js';


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const school = {};
    const comment = {};

    const userFinished = store.initialData ? store.initialData.user1 : null;
    this.state = {
      user: {},
      school,
      userFinished,
      comment
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({user: this.props.user});
    this.loadData();
    
  }

  componentDidUpdate(prevProps) {

    if (prevProps.user !== this.props.user) {
      this.setState({user: this.props.user});
      this.loadData();
    }

  }

 
  async loadData() {
    const vars = {};
    vars.userID = parseInt(this.props.user.id,10);
    vars.schoolID = parseInt(this.props.user.schoolID,10);

    const query = `query comments(
      $schoolID: Int
      $userID: Int) {
      comments(schoolID: $schoolID userID: $userID) {
        id content rating userID schoolID
      }
    }`;
    const data1 = await graphQLFetch(query, vars);
    
    if(data1 && data1.comments[0]) {
        this.setState({ comment: data1.comments[0] });
    }


    const query2 = `query school($id: Int!) {
        school (id: $id) {
          id name address state zip website
        }
    }`;

    const data2 = await graphQLFetch(query2, { id: parseInt(vars.schoolID, 10) });
    if(data2) {
      this.setState({ school: data2.school });
    }

    const query3 = `query user1($id: Int!) {
        user1 (id: $id) {
          id username password address email zip city school firstname lastname country
        }
    }`;
    const data3 = await graphQLFetch(query3, { id: parseInt(vars.userID, 10) });
    if(data3) {
      this.setState({ userFinished: data3.user1 });
    }
  }


  async handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.UserProfilePage;
    
      const updates = {
        address: form.address.value,
        content: form.content.value,
        city: form.city.value,
        zip: form.zip.value,
        rating: parseFloat(form.rating.value),
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        country: form.country.value,
        // email: form.email.value
      };
      var { comment, user } = this.state;
      comment.content = updates.content;
      user.zip = updates.zip;
      user.address = updates.address;
      user.firstname = updates.firstname;
      user.country = updates.country;
      user.lastname = updates.lastname;
      comment.rating = updates.rating;
  
      const query = `mutation commentUpdate(
        $id: Int!
        $changes1: CommentUpdateInputs!
      ){ commentUpdate(
        id: $id
        changes1: $changes1 ){
        id content rating
        }
      }`;
      var {id, ...changes1} = comment;
      const data = await graphQLFetch(query, { changes1, id: parseInt(id, 10) });
      if(data){
        this.setState({ comment: data.commentUpdate });
  
      }
   
    const query2 = `mutation userUpdate(
      $id: Int!
      $changes2: UserUpdateInputs!
    ){ userUpdate(
      id: $id
      changes2: $changes2 ){
      id address city zip firstname lastname country
      }
    }`;
    var {id, ...changes2} = user;
    const data2 = await graphQLFetch(query2, {changes2, id: parseInt(id, 10) });
    if(data2){
      this.setState({ user: data2.userUpdate });
    }
    if(data || data2){
      alert('Updated profile successfully');
    }
    this.loadData();
  }


  render() {
    const userC = this.state.user;
    const{ userFinished } = this.state;

    if( userFinished == null ) return null;
    const{ comment } = this.state;
    if (comment == null) return null;
    const{ school } = this.state;
    if (school == null) return null;

    const{ school: { name } } = this.state;
    const{ userFinished: {username, address, city, zip, email, firstname, lastname, country}} = this.state;
    const{ comment: {rating, content }} = this.state;

  return (
    <React.Fragment>
      
      <ProfilePageHeader />
      <form name = "UserProfilePage" onSubmit={this.handleSubmit}>
        <FormInputs
          ncols={["col-md-5", "col-md-3", "col-md-4"]}
          properties={[
            {
              label: "Graduated University",
              type: "text",
              bsClass: "form-control",
              placeholder: "University",
              defaultValue: userC.school,
              disabled: true
            },
            {
              label: "Username",
              type: "text",
              bsClass: "form-control",
              placeholder: "Username",
              defaultValue: userC.username,
              disabled: true
            },
            {
              label: "Email address",
              type: "email",
              name: "email",
              bsClass: "form-control",
              placeholder: "Email",
              defaultValue: userC.email,
              disabled: true
            }
          ]}
        />
        <FormInputs
          ncols={["col-md-6", "col-md-6"]}
          properties={[
            {
              label: "First name",
              name: "firstname",
              type: "text",
              bsClass: "form-control",
              placeholder: "You may modify and save your first name here",
              defaultValue: userFinished.firstname,
            },
            {
              label: "Last name",
              name: "lastname",
              type: "text",
              bsClass: "form-control",
              placeholder: "You may modify and save your last name here",
              defaultValue: userFinished.lastname,
            }
          ]}
        />
        <FormInputs
          ncols={["col-md-12"]}
          properties={[
            {
              label: "Address",
              name: "address",
              type: "text",
              bsClass: "form-control",
              placeholder: "Home Adress",
              defaultValue: userFinished.address
            }
          ]}
        />
        <FormInputs
          ncols={["col-md-4", "col-md-4", "col-md-4"]}
          properties={[
            {
              label: "City",
              name: "city",
              type: "text",
              bsClass: "form-control",
              placeholder: "City",
              defaultValue: userFinished.city
            },
            {
              label: "Country",
              type: "text",
              name: "country",
              bsClass: "form-control",
              placeholder: "Country",
              defaultValue: userFinished.country
            },
            {
              label: "Postal Code",
              name: "zip",
              type: "number",
              bsClass: "form-control",
              placeholder: "zip",
              defaultValue: userFinished.zip
            }
          ]}
        />
        <FormInputs
          ncols={["col-md-4", "col-md-4", "col-md-4"]}
          properties={[
            {
              label: "University Reviewed",
              type: "text",
              bsClass: "form-control",
              placeholder: "University",
              defaultValue: school.name,
              disabled: true
            },
            {
              label: "Review Comment",
              name: "content",
              type: "text",
              bsClass: "form-control",
              placeholder: "To add new comment, go to school page",
              defaultValue: comment.content,
            },
            {
              label: "Rating",
              name: "rating",
              type: "number",
              bsClass: "form-control",
              placeholder: "Rate between 1-5, to add new comment, go to school page",
              defaultValue: comment.rating,
            }
          ]}
        />


        <Button bsStyle="info" fill type="submit">
                Update
        </Button> 

      </form>
    </React.Fragment>
    );
  }
}
UserProfilePage.contextType = UserContext;
export default UserProfilePage;