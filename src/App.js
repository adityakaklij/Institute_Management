import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import CreateSBT from './Components/CreateSBT';
import ChangeInstitute from './Components/ChangeInstitute';
import OnboardStudent from './Components/OnboardStudent';
import VerifyDetails from './Components/VerifyDetails';


function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [account, setAccount] = useState(null);
  // const walletAddress = useContext(appContext)


  useEffect( () =>{
    // if(window.ethereum){
      setIsWalletInstalled(true);
      // connectWallet()
    // }
  }, []);

      const connectWallet = async() => {
        window.ethereum.request({ method:"eth_requestAccounts"})
        .then( (accounts) => {
          setAccount(accounts[0]);
        }).catch( (e) => {
          alert(e)
        })
        
      }

    if(account === null){
      return(
        <div className="App">{
          isWalletInstalled? (<button className='connectBtn' onClick={connectWallet}> Connect </button>) : (
            <p>Install Metamask Wallet</p>
          )
        }
        </div>
      )
    }
    else {

      return(
        <div className="App">
          <p> Connected as : {account}</p>

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

              <Route exact path="/CreateSBT">
                  <CreateSBT/>
              </Route>

              <Route exact path="/ChangeInsitute">
                  <ChangeInstitute/>
              </Route>

              <Route exact path="/OnboardStudent">
                  <OnboardStudent/>
              </Route>

              <Route exact path="/VerifyDetails">
                  <VerifyDetails/>
              </Route>

            </Switch>


        {/* Footer section  */}
          {/* <Footer/> */}
        {/* Footer section  */}


          </div>
          </Router>

        </div>
      )
    }
  
}

export default App;
