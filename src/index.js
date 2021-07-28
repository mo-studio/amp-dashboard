import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';

keycloak
  .init({ onLoad: 'login-required' })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      // console.log('Authenticated');
      ReactDOM.render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
        document.getElementById('root')
      );
    }
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            // console.log(`Token refreshed${refreshed}`);
          } else {
            console.warn(
              `Token not refreshed, valid for ${Math.round(
                keycloak.tokenParsed.exp +
                  keycloak.timeSkew -
                  new Date().getTime() / 1000
              )} seconds`
            );
          }
        })
        .catch(() => {
          console.error('Failed to refresh token');
        });
    }, 6000);
  })
  .catch(() => {
    console.error('Authenticated Failed');
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
