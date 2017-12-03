import React, { Component } from 'react';
import logo from '../img/car.svg';
import carveup from '../img/carveup.svg';
import WeatherDisplay from './auth/LoginPage';

import '../styles/App.css';



class App extends Component {
    render() {
      return (
        <body>
            <div className="App">
                <div className="App-logo">
                    <img src={ logo } className="App-logo" alt="logo" />
                </div>
                <div className="App-header">
                    <img src={ carveup } className="App-carveup" alt="carveup" />
                </div>
                <LoginPage zip={"12345"}/>
          </div>
        </body>  
      );
  }
}

export default App;
