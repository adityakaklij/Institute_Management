import { ethers } from 'ethers';
import React, { useState } from 'react'
import { SBTABI, SBTAddress } from '../Constants/SBTData';
import {NFTStorage} from 'nft.storage'
import '../CSS/CreateSBT.css'


function CreateSBT() {
    // Address from the usere where NFT/Marksheed need to send
  const [toAddress, setToAddress] = useState()
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)

    const [uploadFile ,setUploadFile] = useState()
    const [metaDataURL, setMetaDataURl] = useState()
    const [imageView, setImageView] = useState();

    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY'
//   Uploadig NFT data to IPFS


    const getAddress = (e)=>{
    let p =  e.target.value;
    setToAddress(p)
    } 

// Input Section to whome send the NFT

const uploadNFTContent = async(inputFile)  =>{
    const nftStorage = new NFTStorage({token: API_KEY,})

    try {
        const metaData = await nftStorage.store({
            name:inputFile.name,
            description: `Profile Image ${toAddress}`,
            name: "This is name",
            address:"This is address",
            data1:"This is data1",
            data2:"This is data2",
            data3:"This is data3",
            data4:"This is data4",
            image:inputFile
            
        });

        setMetaDataURl(getIPFSGatewayURL(metaData.url));
        // console.log("Metadata:- ", metaData);
        previewNFT(metaData)
        MetaTrx(metaData)
        return metaData
    } catch (error) {
        alert(error)
    }
  }
  const getIPFSGatewayURL = (ipfsURL)=>{
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
}
const previewNFT = (metaData) =>{
    let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);;
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));

 
}
  const handleFileUpload= async(event) =>{
    event.preventDefault()
    setUploadFile(event.target.files[0])
  }

  const MetaTrx = async(metaData) =>{
    // It's working properly.
        const mintProfile = await contractInstantce.safeMint(toAddress,getIPFSGatewayURL(metaData.url));
        await mintProfile.wait()
        window.alert("Profile Image uploaded :)")
  }
  const mintNFTToken = async(event , uploadedFile) =>{
    event.preventDefault()
    const metadata = await uploadNFTContent(uploadFile)

  }

// Button to Send NFT 

// Final popUp for the NFT

    return (
    <div className='SBTBody'>
        <h1>Send Marksheet as SBT</h1>
        <input type="text" className='getAddressInput' placeholder='Enter Wallet address' onChange={getAddress} />
        {/* <button onClick={getAdd}>get the Address</button> */}

        <form className='form'>
              <label className='label1' htmlFor="chooseFile"> Upload Profile Img
              <input className='fileUpload' type="file" id='chooseFile' onChange={handleFileUpload}/>
              </label>
        </form>
        <button className='SendMarksheet' onClick={mintNFTToken}>Send Marksheeet</button>
    </div>
  )
}

export default CreateSBT