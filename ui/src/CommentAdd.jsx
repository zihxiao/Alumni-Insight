import React from 'react';
import PropTypes from 'prop-types';
import { FormInputs } from "./components/FormInputs/FormInputs.jsx";
import { Button } from "react-bootstrap";
import { Container } from 'reactstrap';

export default class CommentAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.commentAdd;
    const comment = {
      content: form.content.value,
      rating: parseFloat(form.rating.value),

    };
    const { createComment } = this.props;
    createComment(comment);
    form.content.value = ''; form.rating.value = '';
  }

  render() {
    return (

      <Container>
      <h3>Add your opinion below</h3>
      <form name = "commentAdd" onSubmit={this.handleSubmit} >
        <FormInputs 
              ncols={["col-md-5", "col-md-3", ]}
              properties={[
                {
                  name : "content",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Leave your comments here",
                  defaultValue: ""
                },
                { 
                  name : "rating",
                  type: "number",
                  bsClass: "form-control",
                  placeholder: "Give a rate between 1-5",
                  defaultValue: ""
                },
              ]}
            />
        <Button bsStyle="primary" pullRight fill type="submit">
                Add Comment
        </Button> 
        </form>
      </Container>
    );
  }
}

CommentAdd.propTypes = {
  createComment: PropTypes.func.isRequired,
};
