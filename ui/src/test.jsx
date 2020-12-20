import React from 'react';
import { withRouter } from 'react-router-dom';
import UserContext from './UserContext.js';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: {}};
  }

  componentDidMount() {
    this.setState({user: this.props.user});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({user: this.props.user});
    }
  }

  render() {
    const test = this.state.user;
    const contextValue = this.context;
    const schoolname = this.props.user.school;
    return (
      <div>
        <p>{contextValue.username}</p>
        <p>{schoolname}</p>
        <p>{test.schoolID}</p>
      </div>
    );
  }
}

Test.contextType = UserContext;
export default withRouter(Test);