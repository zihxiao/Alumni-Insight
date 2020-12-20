import React from 'react';
import {
  // Navbar, Nav, NavItem,
  Grid, Col,
} from 'react-bootstrap';
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Breadcrumb,
  BreadcrumbItem,

} from "reactstrap";

import SignIn from './SignIn.jsx';
import Search from './SchoolSearch.jsx';

export default class NavBar extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  let navBar;
  if (userID=== null) {
    navBar = (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>Alumni's Insight</Navbar.Brand>
        </Navbar.Header>
        <Breadcrumb color="neutral">
            <BreadcrumbItem ><a href="./home">Home</a></BreadcrumbItem>
            <BreadcrumbItem active><a href="./visit">All School</a></BreadcrumbItem>
        </Breadcrumb>
        <Col sm={5}>
          <Navbar.Form>
            <Search />
          </Navbar.Form>
        </Col>
        <SignIn getUserData={getUserData}/>
        <LinkContainer to="/register">
            <NavItem>Register</NavItem>
        </LinkContainer>
      </Navbar>
    );
  } else {
    navBar = (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>Alumni's Insight</Navbar.Brand>
        </Navbar.Header>
        <Nav>
        <Breadcrumb color="neutral">
            <BreadcrumbItem ><a href="./home">Home</a></BreadcrumbItem>
            <BreadcrumbItem active><a href="./visit">All School</a></BreadcrumbItem>
            <BreadcrumbItem active>
              <LinkContainer to={`/profile/${user.id}`}>
                <NavItem>{user.username}</NavItem>
              </LinkContainer>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <NavItem onClick={logOut}>Sign Out</NavItem>
            </BreadcrumbItem>
        </Breadcrumb>
        </Nav>
        <Col sm={5}>
          <Navbar.Form>
            <Search />
          </Navbar.Form>
        </Col>
      </Navbar>
    );
  }
}
}
