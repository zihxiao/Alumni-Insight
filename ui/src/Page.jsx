import React from 'react';
import {Navbar, NavItem,Grid,} from 'react-bootstrap';
import {Row} from "reactstrap";
import { LinkContainer } from 'react-router-bootstrap';
import jwtDecode from 'jwt-decode';
import classnames from "classnames";
import Contents from './Contents.jsx';
import UserContext from './UserContext.js';
import SignIn from './SignIn.jsx';
import AdminPageNavbar from './components/Navbars/AdminPageNavbar.jsx';



function NavBar({ user, logOut, getUserData }) {
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
  if (user.id === null) {
    navBar = (
      <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
      >
        <Navbar.Header>
          <Navbar.Brand>Alumni's Insight</Navbar.Brand>
        </Navbar.Header> 
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/visit">
          <NavItem>School List</NavItem>
        </LinkContainer>
          <SignIn getUserData={getUserData}/>
        <LinkContainer to="/register">
            <NavItem>Register</NavItem>
        </LinkContainer>
        <LinkContainer to="https://twitter.com/home">
            <NavItem><i className="fa fa-twitter" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://www.facebook.com/">
            <NavItem><i className="fa fa-facebook-square" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://www.instagram.com/">
            <NavItem><i className="fa fa-instagram" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_WDX_API.git">
            <NavItem><i className="fa fa-github" />{'  '}</NavItem>
        </LinkContainer>
      </Navbar>
    );
  } else if (user.id <= 5){
    navBar = (
      <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
      >
        <Navbar.Header>
          <Navbar.Brand>Alumni's Insight</Navbar.Brand>
        </Navbar.Header> 
        <LinkContainer exact to="/home">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/schools">
          <NavItem>Edit Schools</NavItem>
        </LinkContainer>
        <LinkContainer to="/users">
          <NavItem>Edit Users</NavItem>
        </LinkContainer>
        <LinkContainer to={`/profile/${user.id}`}>
          <NavItem>{user.username}</NavItem>
        </LinkContainer>
          <NavItem onClick={logOut}>Sign Out</NavItem>
        <LinkContainer to="https://twitter.com/">
          <NavItem><i className="fa fa-twitter" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://www.facebook.com/">
          <NavItem><i className="fa fa-facebook-square" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://www.instagram.com/">
          <NavItem><i className="fa fa-instagram" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_WDX_API.git">
          <NavItem><i className="fa fa-github" />{'  '}</NavItem>
        </LinkContainer>
      </Navbar>
    ); 
  } else {
    navBar = (
      <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
      >
        <Navbar.Header>
          <Navbar.Brand>Alumni's Insight</Navbar.Brand>
        </Navbar.Header> 
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/visit">
          <NavItem>School List</NavItem>
        </LinkContainer>
        <LinkContainer to={`/profile/${user.id}`}>
          <NavItem>{user.username}</NavItem>
        </LinkContainer>
          <NavItem onClick={logOut}>Sign Out</NavItem>
        <LinkContainer to="/home">
          <NavItem><i className="fa fa-twitter" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="/home">
          <NavItem><i className="fa fa-facebook-square" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="/home">
          <NavItem><i className="fa fa-instagram" />{'  '}</NavItem>
        </LinkContainer>
        <LinkContainer to="https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_WDX_API.git">
          <NavItem><i className="fa fa-github" />{'  '}</NavItem>
        </LinkContainer>
      </Navbar>
    );
  }
  return navBar;
}

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
        <Row>
        <div className="credits ml-auto">
        Full source code available at this
        {' '}
        <a href="https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_WDX_API.git">
          GitHub repository
        </a>{"   "}
          <span className="copyright">
            © {new Date().getFullYear()}, made with
            <i className="fa fa-heart heart" /> by WDX team {'    '}
          </span>  
        
          </div>
        </Row>
    </footer>
  );
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    const userContext = {
      id: null,
      username: null,
      email: null,
      school: null,
      schoolID: null,
      signIn: false};
    this.state = {
      user: userContext,
    };
    this.logOut = this.logOut.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('jwtToken')) return;
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('jwtToken');
      this.setState({ user: {
        id: null,
        username: null,
        email: null,
        school: null,
        schoolID: null,
        signIn: false
      } });
    } else {
      const userContext = {
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        school: decodedToken.school,
        schoolID: decodedToken.schoolID,
        signIn: true,
      };
      this.setState({user: userContext});
    }
  }

  getUserData(user) {
    this.setState({ user });
  }

  logOut() {
    localStorage.removeItem('jwtToken');
    this.setState({user: {id: null, username: null, email: null, signIn: false}});
    history = this.props;
    history.go();
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <NavBar user={user} logOut={this.logOut} getUserData={this.getUserData} />
        {user.id && user.id <= 5? <AdminPageNavbar /> : null}
        <Grid fluid>
          <UserContext.Provider value={user}>
            <Contents user={user}/>
          </UserContext.Provider>
        </Grid>
        <Footer />
      </div>
    );
  }
}


