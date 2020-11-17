import {Component} from 'react';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './App.css';
import backend from './apiConf.js';
import appTexts from './texts.js';
import ShortMeeting from './ShortMeeting.js';

/**
App component.

@returns {Component} - App component
*/
class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {meetingList: []};
  }

  componentDidMount() {
    backend.get('conferences/')
      .then(resp => {
        this.setState({meetingList: resp.data.results});
      })
      .catch(err => {
        // TODO: implement way to warn admin
        console.log(err);
        this.setState({
          alert: {
            text: appTexts.loadingError,
            variant: 'danger'
          }
        });
      });
  }

  generateAlert() {
    return (
      this.state.alert &&
        <Alert
          variant={this.state.alert.variant}
          onClose={() => this.setState({alert: undefined})}
          dismissible>
          {this.state.alert.text}
        </Alert>
    );
  }

  render () {
    const alert = this.generateAlert();

    return (
      <div className="App">
        {alert}
        <Container>
          <Row xs={1} md={2}>
            {this.state.meetingList.map(
              meeting => (
                <Col key={meeting.id} className="d-flex justify-content-center">
                  <ShortMeeting
                    id={meeting.id}
                    place={meeting.place}
                    title={meeting.title}
                    subTitle={meeting.sub_title}
                    startTime={meeting.start_time}/>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default AppComponent;
