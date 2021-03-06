import { AnimatePresence } from 'framer-motion';
import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Dashboard from '../components/Dashboard';
import History from '../components/History';
import LiveStreaming from '../components/LiveStreaming';


function Body() {
    const location = useLocation();
    return (
          <AnimatePresence>
            <Switch location={location} key={location.key}>
              <Route path="/LiveStream" component={LiveStreaming}/>
              <Route path="/History" component={History}/>
              <Route path='/' component={Dashboard}/>
            </Switch>
          </AnimatePresence>
    )
}

export default Body
