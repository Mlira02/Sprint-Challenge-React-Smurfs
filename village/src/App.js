import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount(){
    axios
    .get('http://localhost:3333/smurfs')
    .then(res => {
      this.setState({
        smurfs: res.data
      });
    })
    .catch(err => console.log('There was an error' , err));
  }

  addSmurf = obj => {
    axios
    .post('http://localhost:3333/smurfs', obj)
    .then(res => {
      this.setState({
        smurfs:res.data
      });
    })
    .catch(err => {
      console.log('Error occurred', err)
    });
  }
    // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/smurf-form" >Smurf Form</NavLink>
        <NavLink to="/smurfs">Smurfs</NavLink>
        <h1>Smurf Database</h1>
        <Route exact path="/smurfs" 
        render={props => (
          <Smurfs {...props} smurfs={this.state.smurfs} />
        )} />
        <Route exact path="/"  />
        <Route exact path="/smurf-form" 
        render={props => (
          <SmurfForm {...props} addSmurf={this.addSmurf}/>
        )}/>
      </div>
    );
  }
}

export default App;
