import React from 'react'

export default function ChatFooter({ message, setMessage, sendMessage, askBot }){
  
  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage(event);
    askBot(event);
  }

  return (
    <div className='fixed bottom-0 w-full py-8 px-8'>
        <form className='flex gap gap-4'>
        {/* <form className='form' onSubmit={handleSendMessage}> */}
          <input 
            type="text" 
            placeholder='Write message' 
            className='rounded-full w-full md:max-w-md block bg-gray-50  p-4 shadow-md focus:outline-none' 
            value={message} 
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? handleSendMessage(event) : null}
            // onKeyDown={handleTyping}
            />
            <button className="rounded-full block bg-emerald-500 p-4 text-white shadow-md focus:outline-none" onClick={event => handleSendMessage(event)}>Send</button>
        </form>
     </div>
  )
}
