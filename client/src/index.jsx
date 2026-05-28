import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <GoogleOAuthProvider clientId="327683842104-kn2g4crqdp4ooosip108lnujigb0qv5e.apps.googleusercontent.com">

    <Provider store={store}>

      <App />

    </Provider>

  </GoogleOAuthProvider>

);



if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker
      .register('/service-worker.js')

      .then((registration) => {

        console.log(
          'Service Worker registered:',
          registration
        );

      })

      .catch((error) => {

        console.log(
          'Service Worker registration failed:',
          error
        );

      });

  });

}