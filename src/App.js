import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'; //import firebase sdk
import 'firebase/firestore'; //for authentication
import 'firebase/auth'; //for authentication

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//call initializeApp to identify our project 
firebase.initializeApp({

})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
