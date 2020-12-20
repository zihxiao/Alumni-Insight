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
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import LandingPageHeader from "./components/Headers/LandingPageHeader.jsx";

function SearchLandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <LandingPageHeader />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Let them talk</h2><h2>Make your choice!</h2>
                <br></br>
                <h5 className="description">
                  We all know that earning degree in an ideal university is so important and meaningful to you, but how? You might get
                  perfect statistics from official website while how can you tell those statistics will affect yours
                  school life in the future? You may know to earn a master degree, 64 credits are required but how
                  do you know the real life experience during the credit hours you will have to pay to learn? That's why we are here 
                  to provide you most authentic opinion from previous student's opinions. You will be able to hear from
                  them the most interesting stories in their school life, special tricks to succeed a curriculum class,
                  or what is the most delicious food you could expect from near the campus. If you are ready to hear, go
                  and start searching your ideal schools!
                </h5>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            </Container>
        </div>
      </div>
    </>
  );
}

export default SearchLandingPage;
