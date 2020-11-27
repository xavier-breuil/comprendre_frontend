import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { shallow } from 'enzyme';
import moment from 'moment';

import Meeting from '../Meeting.js';

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
const FAKE_RESP = {data: MEET_1};

const sandbox = sinon.createSandbox();

describe('Meeting', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should fetch data.', () => {
    const respPromise = Promise.resolve(FAKE_RESP);
    sandbox.stub(axios, 'get').callsFake(() => respPromise);
    const matchParam = {params: {id: 1}};
    const meetingWrapper = shallow(<Meeting match={matchParam} />);
    const expectedDate = moment(MEET_1.start_time, 'YYYY-MM-DDThh:mm:ssZ').format('DD/MM/YYYY hh:mm');

    return respPromise.then(() => {
      expect(meetingWrapper.state('title')).to.eql(MEET_1.title);
      expect(meetingWrapper.find('h1').text()).to.be.eql(MEET_1.title);
      expect(meetingWrapper.find('h2').text()).to.be.eql(MEET_1.sub_title);
      expect(meetingWrapper.find('#place').text()).to.be.eql(MEET_1.place);
      expect(meetingWrapper.find('#date').text()).to.be.eql(expectedDate);
      expect(meetingWrapper.find('#description').text()).to.be.eql(MEET_1.description);
    });
  });
});
