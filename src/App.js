import React from 'react';
import Users from './components/Users';
import { Provider } from './UsersContext';

function App() {
  return (
    <Provider>
      <h1>API 연동하기</h1>
      <Users />
    </Provider>
  );
}

export default App;
