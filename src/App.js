import {Component} from 'react';

import './App.css';
import backend from './apiConf.js';

/**
App component.

@returns {Component} - App component
*/
class AppComponent extends Component {

  componentDidMount() {
    backend.get('conferences/')
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          Search meetings
        </header>
      </div>
    );
  }
}

export default AppComponent;
