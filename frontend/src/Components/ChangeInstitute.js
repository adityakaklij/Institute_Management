import React, { useState } from 'react'
import { ethers } from 'ethers';
import { SBTABI, SBTAddress } from '../Constants/SBTData';
import '../CSS/ChangeInstitute.css'


function ChangeInstitute() {

    const [toAddress , setToAddress] = useState()
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)
    
    const setUserAddress = (e) =>{
        setToAddress(e.target.value)
    }
    const changeUser = async()=>{
        const transferOwner = await contractInstantce.transferOwnership(toAddress)
        await transferOwner.wait()
        window.alert("Student transferred succefully :)")
    }
  
    return (
    <>
        <h2>Transfer the student</h2>

        <div className="changeInstDiv">
            <input type="text" className='transferStudentIn' onChange={setUserAddress} placeholder='Put the address' />
            <br />

            <button className='transferStdBtn' onClick={changeUser}>Transfer Student</button>
            </div>
    </>
  )
}

export default ChangeInstitute