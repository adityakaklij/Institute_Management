import React, { useState } from 'react'
import { ethers } from 'ethers'
import { SBTABI, SBTAddress } from '../Constants/SBTData';
import {NFTStorage} from 'nft.storage'
import file from './file.txt'


function OnboardStudent() {

    const [stWallet, setStWallet] = useState('Na')
    const [name, setName] = useState('Na')
    const [Age, setAge] = useState('Na')
    const [DOB, setDOB] = useState('Na')
    const [OnBoard, setOnBoard] = useState('Na')
    const [PerAddress, SetPerAddress] = useState('Na')
    const [Data1, setData1] = useState('Na')
    

    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY'


    const setTheName = (e)=>{
        setName(e.target.value)
        console.log(e.target.value)
    } 
    const setThesAge = (e)=>{
        setAge(e.target.value)
        console.log(e.target.value)
    }
    const setTheDOB = (e)=>{
        setDOB(e.target.value)
        console.log(e.target.value)
    }
    const setTheOnBoard = (e)=>{
        setOnBoard(e.target.value)
        console.log(e.target.value)
    }
    const setTheAddress = (e)=>{
        SetPerAddress(e.target.value)
        console.log(e.target.value)
    }
    const setTheData1 = (e)=>{
        setData1(e.target.value)
        console.log(e.target.value)
    }
    const walletAddress = (e)=>{
        setStWallet(e.target.value)
    }

  

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(SBTAddress, SBTABI,signer)

    const [uploadFile ,setUploadFile] = useState()
    const [metaDataURL, setMetaDataURl] = useState()
    const [imageView, setImageView] = useState();
    
    const [toAddress, setToAddress] = useState()

    const OnBoardTheStudent = async(inputFile)  =>{
        const nftStorage = new NFTStorage({token: API_KEY,})
    
        try {
            const metaData = await nftStorage.store({

                StudentId:{stWallet},
                name: {name},
                age:{Age},
                DOB:{DOB},
                OnBoard:{OnBoard},
                PerAddress:{PerAddress},
                Data:{Data1},
                image:file
                
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
        const metadata = await OnBoardTheStudent(uploadFile)
    
      }
  return (
    <div>
        <form>
            <label>Wallet Address-:
                <input type="text" onChange={walletAddress}/>
            </label>

            <label>Student's name:
                <input type="text" onChange={setTheName}/>
            </label>

            <label>Age:
                <input type="text" onChange={setThesAge}/>
            </label>
            <br />

            <label>DOB:
                <input type="text" onChange={setTheDOB}/>
            </label>

            <label>OnBoard Course:
                <input type="text"onChange={setTheOnBoard} />
            </label>
            <br />

            <label>Permanant Address:
                <input type="text" onChange={setTheAddress}/>
            </label>

            <label>Data1:
            <input type="text" onChange={setTheData1}/>
            </label>
            <br />
    </form>

    <button onClick={mintNFTToken}>Onboard student</button>
    </div>
  )
}

export default OnboardStudent