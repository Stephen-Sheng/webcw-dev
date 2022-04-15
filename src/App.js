import { NotFoundBoundary, Router, View } from 'react-navi';
import './App.css';
import {routes} from './routes'

function App() {
  return (
    <Router routes={routes}>
      <NotFoundBoundary render={() => <h1>404! Not Found</h1>}>
        <View />
      </NotFoundBoundary>
    </Router>
  );
}

export default App;
