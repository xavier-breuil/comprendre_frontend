import {expect} from 'chai';
import {shallow} from 'enzyme';
import Card from 'react-bootstrap/Card';

import {ShortMeeting} from '../ShortMeeting.js';
import sinon from 'sinon';

const sandbox = sinon.createSandbox();

describe('ShortMeeting', () => {
  afterEach(() => {
    // restore all fakes between each tests.
    sandbox.restore();
  });

  it('should redirect when is clicked.', () => {
    // We do not test history here, just the fact that it has been called.
    const toMeetingSpy = sandbox.spy();
    const fakeHistory = {push: toMeetingSpy};
    const shortMeetingWrapper = shallow(
      <ShortMeeting
        id={1}
        place="Toulouse"
        startTime="2020-04-01T10:00:00Z"
        subtitle="beginner class"
        title="learn reactjs"
        history={fakeHistory}/>);

    shortMeetingWrapper.find(Card).simulate('click');
    expect(toMeetingSpy).to.have.been.calledOnceWith('/meeting/1');
  });
});
