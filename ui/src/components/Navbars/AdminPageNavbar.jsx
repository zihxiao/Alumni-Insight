import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import Button from "../CustomButton/CustomButton.jsx";


function AdminPageNavbar () {

    return (
      <React.Fragment>
        <NavbarBrand
            data-placement="bottom"
            to="/index"
            target="_blank"
            tag={Link}
          >
            <Button bsStyle="warning" pullLeft fill><a href="/schools">You are in Admin Mode, you may edit school database and user database</a></Button>
          </NavbarBrand>
      </React.Fragment>
      
    );
  }

export default AdminPageNavbar;
