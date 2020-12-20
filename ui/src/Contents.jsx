import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import "./assets/css/bootstrap.min.css";
import "./assets/scss/paper-kit.scss?v=1.2.0";
import "./assets/demo/demo.css?v=1.2.0";
import "./assets/css/style.css";
import SearchLandingPage from './SearchLandingPage.jsx';
import UserProfilePage from "./UserProfilePage.jsx";
import SchoolList from './SchoolList.jsx';
import SchoolEdit from './SchoolEdit.jsx';
import RegisterPage from './Register.jsx';
import SchoolDetail from './SchoolDetail.jsx';
import SchoolVisitPage from './SchoolVisitPage.jsx';
import UserList from './UserList.jsx';
import About from './About.jsx';
import Test from "./Test.jsx";

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents({user}) {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/profile/:id" render={() =><UserProfilePage user={user}  />} />
      <Route path="/schools" component={SchoolList} />
      <Route path="/visit" component={SchoolVisitPage} />
      <Route path="/edit/:id" component={SchoolEdit} />
      <Route path="/user/:id" component={SchoolEdit} />
      <Route path="/home" component={SearchLandingPage} />
      <Route path="/users" component={UserList} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/detail/:id" render={(props) =><SchoolDetail user={user} history={props.history} schoolID={props.match.params.id} />} />
      <Route path="/about" component={About} />
      <Route path="/visit" component={SchoolVisitPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}


