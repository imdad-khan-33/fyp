import React, { useContext, useEffect, useState } from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import {logout} from '../../config/firebase'
import { AppContext } from '../../context/AppContext'

const RightSidebar = () => {

  const {chatUser, messages} = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(()=>{
    let tempVar = [];
    messages.map((msg)=>{
      if(msg.image){
        tempVar.push(msg.image);
      }
    })
    setMsgImages(tempVar);
  }, [messages])

  return chatUser ? (
    <div className='rs'>
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>{Date.now() - chatUser.userData.lastSeen <= 70000 && <img src={assets.green_dot} className='dot' alt="" />}{chatUser.userData.name}</h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        {msgImages.length>0 && <p>Media</p>}
        <div>
          {msgImages.map((url, index)=>(
             <img key={index} onClick={()=>window.open(url)} src={url} alt="" />
          ))}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  ) : 
  <div className='rs'>
    <button >Logout</button>

    {/* onClick={()=>logout()} */}
  </div>
}

export default RightSidebar