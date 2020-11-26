import { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';

import appTexts from './texts.js';
import './Meeting.css';
import { backendConf } from './apiConf.js';
import locate from './images/locate.png';
import calendar from './images/calendar.png';

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.match.params.id};
    this.participate = this.participate.bind(this);
  }

  componentDidMount() {
    axios.get(`${backendConf.baseUrl}${backendConf.latestVersion}conferences/${this.state.id}/`).then(data => {
      this.setState(data.data);
    }).catch(error => {
      // TODO: make alert reusable, not only on App.js
      console.log(error);
    });
  }

  participate() {
    // TODO: post participation on backend.
    console.log(`participate to meeting ${this.state.id}`);
  }

  render() {
    return (
      <div className="meeting">
        <h1>{this.state.title}</h1>
        <h2>{this.state.sub_title}</h2>
        <div className="details">
          <div className="std-margin text-capitalize">
            <img src={locate} alt="" className="icon"/>{this.state.place}
          </div>
          <div className="std-margin">
            <img src={calendar} alt="" className="icon"/>{moment(this.state.start_time, 'YYYY-MM-DDThh:mm:ssZ').format('DD/MM/YYYY hh:mm')}
          </div>
        </div>
        <div className="details">
          <div className="std-margin text-capitalize font-weight-bold">
            {appTexts.description}
          </div>
          <div className="std-margin">
            {this.state.description}
          </div>
        </div>
        <Button className="primary-button" onClick={this.participate}>
          {appTexts.participate}
        </Button>
      </div>
    );
  }
}
Meeting.propTypes = {
  match: PropTypes.object
};

export default Meeting;
