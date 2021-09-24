import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Btc from './Btc';
import SP500 from './SP500';
import MyDataTable from './MyDataTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Btc} />
          <Route exact path="/all" component={SP500} />
          <Route exact path="/table" component={MyDataTable} />
        </div>
      </Router>

    </div>
  );
}

export default App;
