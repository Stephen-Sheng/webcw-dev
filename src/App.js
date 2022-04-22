import { NotFoundBoundary, Router, View } from 'react-navi';
import { Empty } from 'antd'
import './App.css';
import { routes } from './routes'
import { userReducer } from './reducers'
import React, { useReducer, Suspense } from 'react';
import { UserContext } from './context';
import { axiosInstance } from './axios'
import {RequestProvider} from 'react-request-hook';

function App() {

  const [user, dispatch] = useReducer(userReducer, '')

  return (
    <RequestProvider value={axiosInstance}>
    <UserContext.Provider value={{ user, dispatch }}>
      <Router routes={routes} context={{user}}>
      <Suspense fallback={null}>
        <NotFoundBoundary render={() => <Empty
          imageStyle={{
            height: 660,
          }}
          description={<h1><span style={{color:'red'}}>Err:404 Not Found!</span></h1>}
        ></Empty>}>
          <View />
        </NotFoundBoundary>
        </Suspense>

      </Router>
    </UserContext.Provider>
    </RequestProvider>

  );
}

export default App;
