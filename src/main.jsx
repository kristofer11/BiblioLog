import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter as Router} from 'react-router-dom'
import store from './redux/store.js';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { inject } from '@vercel/analytics';

//ENABLES VERCEL ANALYTICS
inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Provider store={store}>
            <App />        
         </ Provider>
    </Router>
  </React.StrictMode>,
)