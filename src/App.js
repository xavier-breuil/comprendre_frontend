import { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InfinitScroll from 'react-infinite-scroller';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';
import { backendConf } from './apiConf.js';
import appTexts from './texts.js';
import MeetingCard from './ShortMeeting.js';
import SearchBar from './SearchBar.js';
import Meeting from './Meeting.js';

/**
App component.

@returns {Component} - App component
*/
class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingList: [],
      nextData: `${backendConf.baseUrl}${backendConf.latestVersion}conferences/`,
      queryParam: {}
    };
    this.catchLoadingError = this.catchLoadingError.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  catchLoadingError(error) {
    // TODO: implement way to warn admin
    // eslint-disable-next-line no-console
    console.log(error);
    this.setState({
      alert: {
        text: appTexts.loadingError,
        variant: 'danger'
      }
    });
  }

  generateAlert() {
    return (
      this.state.alert &&
      <Alert
        variant={this.state.alert.variant}
        onClose={() => this.setState({ alert: undefined })}
        dismissible>
        {this.state.alert.text}
      </Alert>
    );
  }

  filterData(queryParam) {
    // Updating the state will re-render and thus fetch data.
    this.setState({
      meetingList: [],
      nextData: `${backendConf.baseUrl}${backendConf.latestVersion}conferences/`,
      queryParam
    });
  }

  loadMore() {
    axios.get(this.state.nextData, { params: this.state.queryParam }).then(nextData => {
      this.setState({
        meetingList: this.state.meetingList.concat(nextData.data.results),
        nextData: nextData.data.next
      });
    }).catch(this.catchLoadingError);
  }

  render() {
    const alert = this.generateAlert();

    return (
      <Router>
        <Route exact path="/">
          <div>
            {alert}
            <SearchBar filterData={this.filterData} />
            <InfinitScroll
              pageStart={-1}
              loadMore={this.loadMore}
              hasMore={Boolean(this.state.nextData)}
              loader={<div className="loader" key={0}>Chargement...</div>}
            >
              <Container>
                <Row xs={1} md={2}>
                  {this.state.meetingList.map(
                    meeting => (
                      <Col key={meeting.id} className="d-flex justify-content-center">
                        <MeetingCard
                          id={meeting.id}
                          place={meeting.place}
                          title={meeting.title}
                          subTitle={meeting.sub_title}
                          startTime={meeting.start_time} />
                      </Col>
                    ))}
                </Row>
              </Container >
            </InfinitScroll>
          </div >
        </Route>
        <Route path="/meeting/:id" component={Meeting} />
      </Router>
    );
  }
}

export default AppComponent;
