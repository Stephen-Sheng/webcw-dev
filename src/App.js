import { NotFoundBoundary, Router, View } from 'react-navi';
import { Empty } from 'antd'
import './App.css';
import { routes } from './routes'
import { userReducer } from './reducers'
import React, { useReducer } from 'react';
import { UserContext } from './context';

function App() {

  const [user, dispatch] = useReducer(userReducer, '')

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Router routes={routes}>
        <NotFoundBoundary render={() => <Empty
          imageStyle={{
            height: 660,
          }}
          description={<h1><span style={{color:'red'}}>Err:404 Not Found!</span></h1>}
        ></Empty>}>
          <View />
        </NotFoundBoundary>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
