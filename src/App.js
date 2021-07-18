import React,{Fragment}  from "react";
import Login from "./components/Login";
import {AuthProvider} from "./context/AuthContext"
import { Switch, Route, Link, useLocation} from "react-router-dom";
import Dashboard from "./components/Dashboard";


function App() {
  
  return (
    <AuthProvider>
            <Switch>
              <Route path='/Login' component={Login}/>
              <Route path='/' component={Dashboard}/>
              {/* <Route path='/' render={() =>
                    <Fragment>
                        <Header/>
                        <Body/>
                        <Controller/>
                    </Fragment>
                    } /> */}
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