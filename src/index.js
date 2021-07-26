import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import swDev from "./swDev"
import { faHome, faFilm, faUser, faCog, faArrowsAltV, faTemperatureHigh, faMapMarkerAlt, faTint, faHistory, faSignOutAlt, faQuestion, faCommentAlt, faSun} from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faFilm, faUser, faCog, faArrowsAltV, faTemperatureHigh, faMapMarkerAlt, faTint, faHistory, faSignOutAlt, faQuestion, faCommentAlt, faSun)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
swDev();
