// import React from 'react'
import React, { useEffect, useState, useRef} from 'react'
import io from 'socket.io-client';
import { collection, doc, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore'
import ChatBody from '../components/ChatBody'
import ChatFooter from '../components/ChatFooter'
import { useAuth } from '../context/AuthContext';
import { authentication, db } from '../config/firebase-config'

let socket;
const ChatPage = () => {
  const {token, idUser, name } = useAuth();
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const lastMessageRef = useRef(null)
  const ENDPOINT = import.meta.env.VITE_SERVER_HOST;

  useEffect(() => {
    socket = io(ENDPOINT, {
      auth: {
          token,
      },
      transports: ["websocket"]
      
    });
    socket.emit('join') 

    const getAllHistory = async () => {
      const messagesRef = collection(doc(db, "chats", idUser ), 'messages' );
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const data = await getDocs(q);
      setMessages(data.docs.map((doc) => (doc.data())));
    }
  
    getAllHistory()
      .catch(err => err.message);
  },[ENDPOINT]);


  useEffect(() => {

    socket.on('message', msg => {
      setMessages(messages => [...messages, msg])

      const addHistory = async (msg) => {
        const messagesRef = collection(doc(db, "chats", idUser ), 'messages' );
        await addDoc(messagesRef, msg);
      }

      addHistory({...msg, timestamp: serverTimestamp()})
        .catch(err => err.message);
    })

  },[]);


  const sendMessage = (event) => {
    event.preventDefault();
    if(message){
      socket.emit('sendMessage', message, () => setMessage(''));  
    }
  }

  const askBot = (event) => {
    event.preventDefault();
    if(message){
      socket.emit('askBot', message, () => setMessage(''));    
    }
  }

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  
  // console.log(history);
  return (
    <div className="w-full max-w-xl mx-auto">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef}/>
        <ChatFooter message={message} setMessage={setMessage} sendMessage={sendMessage} askBot={askBot}/>
    </div>
  )
}

export default ChatPage
