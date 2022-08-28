import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import CreateSBT from './Components/CreateSBT';
import ChangeInstitute from './Components/ChangeInstitute';
import OnboardStudent from './Components/OnboardStudent';
import VerifyDetails from './Components/VerifyDetails';

import UAuth from '@uauth/js'


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
      const uauth = new UAuth({
        
        clientID: "807aa643-0795-4780-8fe6-c251bf762723",
        redirectUri: "http://localhost:3000",
        scope: "openid wallet"
      })  

      const loginFun =async ()=>{
        const authorization = await uauth.loginWithPopup();
        // console.log(authorization)
        connectWallet()
      }

    if(account === null){
      return(
        <div className="App">{
          isWalletInstalled ? (<> 
          {/* <button className='connectBtn' onClick={connectWallet}> Connect </button>  */}
              <button className='connectBtn' onClick={loginFun}>Login with Unstoppable</button>
          </>)  : (
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
          {/* <HashRouter > */}
          <div className="App">
            <Navbar/>

          <Switch>

              <Route exact path="/Home" component={Home}>
                  {/* <Home/> */}
              </Route>

              <Route exact path="/OnboardStudent" component={OnboardStudent}> 
                  {/* <OnboardStudent/> */}
              </Route>

              <Route  path="/CreateSBT" component={CreateSBT}>
                  {/* <CreateSBT/> */}
              </Route>

              <Route  path="/ChangeInstitute" component={ChangeInstitute}>
                  {/* <ChangeInstitute/> */}
              </Route>

              <Route  path="/VerifyDetails" component={VerifyDetails}>
                  {/* <VerifyDetails/> */}
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
