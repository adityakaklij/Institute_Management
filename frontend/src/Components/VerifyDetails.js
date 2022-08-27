import React, { useState } from 'react'
import { SBTABI, SBTAddress } from '../Constants/SBTData';
import {ethers} from 'ethers'
import '../CSS/VerifyDetails.css'

function VerifyDetails() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)

    const [data, setData]= useState()

    const getDetails = async()=>{
      
      const getData = await contractInstantce.setStudent(data)
      if (getData === ''){
        console.log("No data found")
      }
      else{

        const tokenMetada = await fetch(getData)
        const jsonData = await tokenMetada.json()
        let fetchedStudentId = await jsonData.StudentId ;
        alert("Student is verified")
      }
    }

    const details = (e) =>{
      setData(e.target.value)
    }

  return (
    <>

        <h2>Enter Student's detail to Verify</h2>
        
        <div className="verifyDiv">
            <input type="text" className='verifyStdInput' onChange={details} placeholder="Enter student's ID" />
            <br />
            <button className='veryFyDetailBtn' onClick={getDetails}>Get Details</button>
        </div>
    </>
  )
}

export default VerifyDetails