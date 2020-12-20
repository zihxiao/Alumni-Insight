import React from 'react';

const UserContext = React.createContext({
  id: null,
  username: null,
  email: null,
  schoolID: null,
  school: null,
  signedIn: false,
});

export default UserContext;