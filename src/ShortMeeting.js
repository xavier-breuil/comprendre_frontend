import {Component} from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import './ShortMeeting.css';
import locate from './images/locate.png';
import calendar from './images/calendar.png';

/**
Meeting component that display only basic information.

@returns {Component} - Meeting component to display in a list.
*/
class ShortMeeting extends Component {
  constructor(props) {
    super(props);
    this.toMeeting = this.toMeeting.bind(this);
  }

  toMeeting () {
    this.props.history.push(`/meeting/${this.props.id}`);
  }

  render () {
    return (
      <Card onClick={this.toMeeting}>
        <Card.Body className="title">
          <Card.Title>{this.props.title}</Card.Title>
        </Card.Body>
        <Card.Body>
          <Card.Text>{this.props.subTitle}</Card.Text>
          <Card.Text><img src={locate} alt="" className="icon"/>{this.props.place}</Card.Text>
          <Card.Text><img src={calendar} alt="" className="icon"/>
            {moment(this.props.startTime, 'YYYY-MM-DDThh:mm:ssZ').format('DD/MM/YYYY hh:mm')}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
ShortMeeting.propTypes = {
  // not deserialized yet
  history: PropTypes.object,
  id: PropTypes.number,
  place: PropTypes.string,
  startTime: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

const MeetingCard = withRouter(ShortMeeting);
export default MeetingCard;
