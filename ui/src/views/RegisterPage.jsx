/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";

function RegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <div
        className="page-profile"
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="twitter"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <Form className="register-form">
                <FormInputs
              ncols={["col-md-6", "col-md-6"]}
              properties={[
                {
                  label: "FirstName",
                  type: "text",
                  bsClass: "form-control",
                  
                  defaultValue: "Steven"
                },
                {
                  label: "LastName",
                  type: "text",
                  bsClass: "form-control",
                  
                  defaultValue: "Smith"
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-6", "col-md-6","col-md-6"]}
              properties={[
                {
                  label: "City",
                  type: "text",
                  bsClass: "form-control",
                  
                  defaultValue: "Phoenix"
                },
                {
                  label: "Country",
                  type: "text",
                  bsClass: "form-control",
                  
                  defaultValue: "US"
                },
                {
                  label: "Zip",
                  type: "text",
                  bsClass: "form-control",
                  
                  defaultValue: "12345"
                }
              ]}
            />
                  <label>Email</label>
                  <Input placeholder="Email" type="text" />
                  <label>Password</label>
                  <Input placeholder="Password" type="password" />
                  <label>University</label>
                  <Input placeholder="University" type="text" />
                  <Button block className="btn-round" color="danger">
                    Register
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by WDX team
          </h6>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
