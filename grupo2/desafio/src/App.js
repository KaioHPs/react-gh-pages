import Search from './pages/Search';
import Details from './pages/Details';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={ Search } />
      <Route path="/user/:id" render={ (props) => <Details { ...props } /> } />
      </Switch>
    </div>
  );
}

export default App;
