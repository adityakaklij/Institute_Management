import React, { useState , useEffect} from 'react'
import { ethers } from 'ethers';
import "../App.css"
import '../CSS/Navbar.css'
import { Link } from 'react-router-dom';


export default function Navbar() {

    const [connectIs, setConnectIs] = useState("Connect")

    useEffect(() => {
    //   Connect()
    })
    
    async function Connect() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        // setMainAddress(myAddress)
        setConnectIs("Connected")
    }
    
  return (

    <div>
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
        <nav className="navbar navbar-expand-lg  ">
            <div className="container-fluid">

                {/* <a className="navbar-brand" href="/">Navbar</a> */}
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">Hello </span>
                </button> */}

                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                        <link rel="stylesheet" href="/Home" />
                        
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/CreateSBT">CreateSBT</a>
                        {/* <Link className="nav-link" to="/CreateSBT">CreateSBT</Link> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ChangeInstitute">ChangeInstitute</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/OnboardStudent">OnboardStudent</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="/VerifyDetails">VerifyDetails</a>
                    </li>
                        
                    {/* <li lassName='nav-item1'>
                        <button className="connectBtn " onClick={Connect}>{connectIs}</button>
                            
                    </li> */}
                </ul>

                        
                </div>
            </div>
        </nav>  
    </div>
  )
}
