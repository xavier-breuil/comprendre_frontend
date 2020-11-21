import { expect } from 'chai';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import App from '../App.js';
import ShortMeeting from '../ShortMeeting.js';
import sinon from 'sinon';
import appTexts from '../texts.js';

const MEET_1 = {
  'admin': null,
  'attender_group': [1],
  'description': 'test description 2',
  'id': 1,
  'place': 'room_1',
  'speaker_group': [1],
  'start_time': '1989-07-10T10:00: 00Z',
  'stop_time': '1989-07-10T11:00:00Z',
  'sub_title': 'sub title number 1 with reasonnable length',
  'title': 'conf 2'
};
const MEET_2 = {
  'admin': 1,
  'attender_group': [1],
  'description': 'how can technology help rural people',
  'id': 2,
  'place': 'toulouse',
  'speaker_group': [1],
  'start_time': '2020-11-10T08:28:30Z',
  'stop_time': '2020-11-10T09:28:32Z',
  'sub_title': null,
  'title': 'technology for rural'
};
const NEXT_PAGE_URL = 'http://127.0.0.1:8001/v1/conferences/?limit=2&offset=2';
const FAKE_RESP = {
  'count': 2,
  'next': NEXT_PAGE_URL,
  'previous': null,
  'results': [MEET_1, MEET_2]
};

const sandbox = sinon.createSandbox();

describe('App', () => {
  afterEach(() => {
    // restore all fakes between each tests.
    sandbox.restore();
  });

  it('should have a container to display meetings.', () => {
    const respPromise = Promise.resolve({ data: FAKE_RESP });
    sandbox.stub(axios, 'get').callsFake(() => respPromise);
    const appWrapper = shallow(<App />);
    // loadMore needs to be triggered manually during the tests.
    appWrapper.instance().loadMore();

    // https://github.com/enzymejs/enzyme/issues/346
    return respPromise.then(() => {
      expect(appWrapper.state('meetingList')).to.have.members([MEET_1, MEET_2]);
      expect(appWrapper.state('nextData')).to.eql(NEXT_PAGE_URL);
      expect(appWrapper.find(Col)).to.have.lengthOf(2);
      expect(appWrapper.find(ShortMeeting)).to.have.lengthOf(2);
      expect(appWrapper.find(Alert)).to.have.lengthOf(0);
    });
  });

  it('should display an alert when an error occurs fetching data.', () => {
    const respPromise = Promise.reject(new Error('connection error'));
    sandbox.stub(axios, 'get').callsFake(() => respPromise);
    const appWrapper = shallow(<App />);
    // loadMore needs to be triggered manually during the tests.
    appWrapper.instance().loadMore();

    return respPromise.catch(() => {
      // re-render after catching the http error.
      appWrapper.update();
    }).then(() => {
      expect(appWrapper.find(Col)).to.have.lengthOf(0);
      expect(appWrapper.find(Alert)).to.have.lengthOf(1);
      expect(appWrapper.find(Alert).text()).to.be.eql(appTexts.loadingError);
    }).then(() => {
      // Closing should make the alert disapear.
      appWrapper.find(Alert).prop('onClose')();
      expect(appWrapper.find(Alert)).to.have.lengthOf(0);
      expect(appWrapper.state('aler')).to.be.undefined();
    });
  });
});
