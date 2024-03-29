import React, { useRef, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import firebase from 'firebase/app'; //import firebase sdk
import 'firebase/firestore'; //for authentication
import 'firebase/auth'; //for authentication
// import config from './firebase.js'
import firebase from './firebase';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>hello</h1>
        <SignOut/>
      </header>

      <section>
        {user ? <ChatRoom/> : <SignIn/> }
      </section>
    </div>
  );
}

function SignIn()  {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Googs</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Let Me Out</button>
  )
}

function ChatRoom() {
  const scroll = useRef(); //auto scroll to bottom div with this hook
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'}); //listen to data with a hook, each obj is the chat message. 
  const [formValue, setFormValue] = useState(''); //to bind state to form input

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({ //create new document in firestore
      text: formValue, 
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue(''); //reset form value to blank
    scroll.current.scrollIntoView({ behavior: 'smooth' }); //scroll to bottom whenever user sends a message
  }

  return (
  <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    
      <div ref={scroll}></div>
    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type='submit'>Send Message</button>
    </form>
  </>
  );
}

function ChatMessage(props) { //child of ChatRoom
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'; //conditional CSS, if they're equal current user sent the message. This way we can conditionally style based on if the message was sent or received.





  return (
    
    <div className={`message ${messageClass}`}> 
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
