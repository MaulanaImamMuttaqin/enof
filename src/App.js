import React, { Fragment, useEffect } from "react";
import Login from "./components/Login";
import {AuthProvider} from "./context/AuthContext"
import { Switch, Route } from "react-router-dom";
import Navigation from "./main/Navigation";
import Body from "./main/Body";
import Header from "./main/Header";
import firebase from "./firebase"

function App() {
  useEffect(()=>{
    const messaging = firebase.messaging()
    // messaging.getToken({vapidKey: "BN5jpvIFIdTUxWTe4L0fJGMNk8tjq6oGgVLcnWJ9d6ntDDidwVLPIdsK9FISAl--1j8EnCunvVLENB-O6JvHiUg"});
    messaging.getToken({ vapidKey: 'BN5jpvIFIdTUxWTe4L0fJGMNk8tjq6oGgVLcnWJ9d6ntDDidwVLPIdsK9FISAl--1j8EnCunvVLENB-O6JvHiUg' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log('Token', currentToken)
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  },[])
  return (
    <AuthProvider>
            <Switch>
              <Route path='/Login' component={Login}/>
              <Route path='/' render={() =>
                    <Fragment>
                        <Header/>
                        <Body/>
                        <Navigation/>
                    </Fragment>
                    } />
            </Switch>
    </AuthProvider>
    
  );
}

export default App;

// <div className="center">
//       <h1 className="bg-gray-500 font-body text-white flex items-center justify-center 
//                        text-6xl font-bold uppercase p-10 border-8 border-black rounded-3xl 
//                        shadow-xl hover:bg-gray-700 active:bg-gray-500 cursor-pointer transition ease-out duration-500">
//                          Maulana Imam Muttaqin
//                          </h1>
//     </div>npm 