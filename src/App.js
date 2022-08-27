import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (

    <Router basename='/'>
    <div className="App">
      <Navbar/>

    <Switch>

        <Route exact path="/">
            <Home/>
        </Route>

        <Route exact path="/Home">
            <Home/>
        </Route>

        {/* <Route exact path="/Mint">
            <Mint/>
        </Route> */}

      </Switch>

    <Footer/>

    </div>
    </Router>
)
}

export default App;
