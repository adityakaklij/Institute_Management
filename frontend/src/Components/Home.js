import React from 'react'
// import '../CSS/Home.css'
import '../CSS/Home.css'

function Home() {

    
  
    return (
    
    <>
      <h1 className='mainHeading'>Institute Management System with SBT</h1>

<div className="row">
      
      <div className="class">
            <h2 className="stdManagment">Student Management</h2>

            <p className="stdpm">To reduce hassel of students while onboarding into new Institutes.</p>
            <br />
            
            <h2>SoulBound  Certificates</h2>
            <p>Final year Certificates as a SoulBound NFTs to keep authenticity.</p>


            <h2>Student Transfers</h2>
            <p>Student can be Transfer to new institutes with a single blockchain trasaction.</p>


            <h2>Student Verification</h2>
            <p>Single click verification to verify the student data. </p>
        </div>

      <div className="class">

            <h4>Immutable Students data</h4>
            <h4>Authenticated users</h4>
            <h4> Wallet based identity</h4>

      </div>

</div>
    </>
  )
}

export default Home