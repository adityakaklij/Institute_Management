import React, { useState } from 'react'
import { SBTABI, SBTAddress } from '../Constants/SBTData';
import {ethers} from 'ethers'

function VerifyDetails() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)

    const [data, setData]= useState()

    const getDetails = async()=>{
      const getData = await contractInstantce.setStudent(data)
      console.log(getData);
    }

    const details = (e) =>{
      setData(e.target.value)
    }

  return (
    <>

        <h2>Enter Student's detail to Verify</h2>
        <input type="text" onChange={details} placeholder="Enter student's ID" />

        <button onChange={getDetails}>Get Details</button>
    </>
  )
}

export default VerifyDetails