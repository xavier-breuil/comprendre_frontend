import { Component } from 'react';
import PropTypes from 'prop-types';

class Meeting extends Component {
  render() {
    return (<div>
      display meeting {this.props.match.params.id} here
    </div>
    );
  }
}
Meeting.propTypes = {
  match: PropTypes.object
};

export default Meeting;
