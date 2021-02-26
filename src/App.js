// import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'; //import firebase sdk
import 'firebase/firestore'; //for authentication
import 'firebase/auth'; //for authentication
// import config from './firebase.js'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrD-iQ56W7ESAaNoqEhi8jCf8PwyEkPMk",
  authDomain: "chat-tutorial-69c44.firebaseapp.com",
  projectId: "chat-tutorial-69c44",
  storageBucket: "chat-tutorial-69c44.appspot.com",
  messagingSenderId: "471462513622",
  appId: "1:471462513622:web:cfa6c9ff677b99ffde3277"
}
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>hello</h1>
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
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'}); //listen to data with a hook, each obj is the chat message. 


  return (
  <>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
    </div>
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
