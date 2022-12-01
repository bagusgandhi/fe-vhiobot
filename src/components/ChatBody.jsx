import React from 'react'
import { useAuth } from '../context/AuthContext'
import Vhiobot from '../assets/icon-vhiobot.svg'


export default function ChatBody({ messages, lastMessageRef }){ 

  const { handleLeaveChat } = useAuth()
  
  return (
    <div className='w-full max-w-xl mx-auto h-screen overflow-y-auto msg-body'>
      {/* header */}
      <div className='fixed top-0 bg-white w-full md:max-w-xl rounded-xl p-6 flex justify-between items-center'>
          <div className='flex gap gap-2 items-center'>
              <div className='rounded-full bg-indigo-100 p-2'>
                <img src={Vhiobot} alt="Vhiobot icon" width={30}/>
              </div>
              <p className='font-bold'>VhioBot</p>
          </div>
          <button className='rounded-xl block bg-red-400 p-2 text-white text-small shadow-md focus:outline-none' onClick={handleLeaveChat}>Leave Chat</button>
      </div>

      {/* body */}
      <div className='py-28'>
          { messages?.map((message, i) => (
            // cheks message name
            message.name === localStorage.getItem('name') ? (
              // show sender message
              <div className="flex justify-end" key={i}>
                  <p className='bg-indigo-200 p-4 rounded-tl-xl rounded-b-xl mr-2 my-4'>{message.text}</p>
              </div>
            ) 
            : (
              // show message receipt
              <div className='flex justify-start' key={i}>
                  <p className='bg-white p-4 rounded-tr-xl rounded-b-xl ml-2 my-4'>{message.text}</p>
              </div>
            )  
          ))}

          <div ref={lastMessageRef} />   
      </div>
    </div>
  )
}

// export default ChatBody