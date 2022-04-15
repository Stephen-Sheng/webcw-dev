import { Router, View } from 'react-navi';
import './App.css';
import { routes } from './routes'

function App() {
  return (
    <Router routes={routes}>
      <View />
    </Router>
  );
}

export default App;
