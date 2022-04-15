import { NotFoundBoundary, Router, View } from 'react-navi';
import './App.css';
import {routes} from './routes'
import { userReducer } from './reducers'
import React, { useReducer } from 'react';
import { UserContext } from './context';

function App() {

  const [user, dispatch] = useReducer(userReducer, '')

  return (
    <UserContext.Provider value={{ user, dispatch }}>
    <Router routes={routes}>
      <NotFoundBoundary render={() => <h1>404! Not Found</h1>}>
        <View />
      </NotFoundBoundary>
    </Router>
    </UserContext.Provider>

  );
}

export default App;
