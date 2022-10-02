// import React from 'react'
import React, { useEffect, useState, useRef} from 'react'
import io from 'socket.io-client';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, serverTimestamp  } from 'firebase/firestore'
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
  const ENDPOINT = process.env.SERVER_HOST;
  // const chatDocRef = doc(db, 'chats', idUser);

  useEffect(() => {
    socket = io(ENDPOINT, {
      auth: {
          token,
      },
      transports: ["websocket"]
      
    });
    socket.emit('join') 
  },[ENDPOINT]);

  // console.log(token);
  useEffect(() => {
    socket.on('message', msg => {
      setMessages(messages => [...messages, msg])
    })
    // setIdUser(authentication.currentUser.uid);
  },[]);
  
  // useEffect(() => {
  //   const getChatData = async () => {
  //     const userRef = doc(db, "chats", idUser );
  //     const messagesRef = collection(userRef, 'meesages' );
  //     // await addDoc(messagesRef, {
  //     //   text: 'test',
  //     //   name: 'vhiobot',
  //     //   timestamp: serverTimestamp(),
  //     // });
  //     const docSnap = await getDocs(messagesRef);
  //     // const docSnap = await getDoc(userRef);
  //     console.log(docSnap.forEach(doc => doc.data()));
  //     // docSnap.forEach(doc => {
  //     //   const { name, text } = doc.data();
  //     //   console.log({ name, text });
  //     // });
  //     // console.log(docSnap);
  //     // const messageSnap = await getDoc(messageRef);

  //     // if (userSnap.exists()) {
  //     //   console.log("Document data:", userSnap.data());
  //     // } else {
  //     //   await setDoc(userRef, {
  //     //     name: name,
  //     //   });
  //       // ini untuk masukan data message 
  //       // await addDoc(messagesRef, {
  //       //   text: 'test',
  //       //   name: 'vhiobot',
  //       //   timestamp: serverTimestamp(),
  //       // });
  //     }
  //   // }

  //   getChatData();
  // }, []);
  
  // console.log(idUser);
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

  return (
    <div className="w-full max-w-xl mx-auto">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef}/>
        <ChatFooter message={message} setMessage={setMessage} sendMessage={sendMessage} askBot={askBot}/>
    </div>
  )
}

export default ChatPage
