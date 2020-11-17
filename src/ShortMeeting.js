import {Component} from 'react';
import PropTypes from 'prop-types';

/**
Meeting component that display only basic information.

@returns {Component} - Meeting component to display in a list.
*/
class ShortMeeting extends Component {
  render () {
    return (
      <div>
        {this.props.title}
      </div>
    );
  }
}
ShortMeeting.propTypes = {
  // not deserialized yet
  place: PropTypes.string,
  startTime: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

export default ShortMeeting;
