// import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { Navbar, NavbarBrand } from 'reactstrap';
// import Directory from './components/DirectoryComponent';
// import { CAMPSITES } from './shared/campsites';
import Main from './components/MainComponent';
import './App.css';

// function App() {
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       campsites: CAMPSITES
  //   };
  // }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Main />
        </div>
      </BrowserRouter>
  );
  }
}


export default App;
