import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
  
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)

    .then((result) => {
      
      const {displayName, email, photoURL} = result.user;
      console.log(result.user);

      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      }

      setUser(loggedInUser);
    })

    .catch((error) => {
      console.log(error.message);
    });
  }

  const handleGitHubSignIn = () => {
    
    signInWithPopup(auth, gitHubProvider)
    .then((result) => {

    const {displayName, email, photoURL} = result.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      photo: photoURL,
    }
    setUser(loggedInUser);
  })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
     setUser({})
    })
  }


  return (
    <div className="App">
      {
        user.name ? 
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button> <br/>
        <button onClick={handleGitHubSignIn}>GitHub Sign In</button> <br/>
        </div>
      }

      
      <br/>

      {
        user.name && 
                    <div>
                      <h2>Welcome {user.name}</h2>
                      <p>I know your email address: {user.email}</p>
                      <img src={user.photo} alt="" />
                    </div>
      }

    </div>
  );
}

export default App;
