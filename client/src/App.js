import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Btc from './Btc';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Btc} />
        </div>
      </Router>

    </div>
  );
}

export default App;
