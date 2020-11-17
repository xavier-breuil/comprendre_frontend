import {expect} from 'chai';
import {shallow} from 'enzyme';
import Card from 'react-bootstrap/Card';

import ShortMeeting from '../ShortMeeting.js';
import sinon from 'sinon';

const sandbox = sinon.createSandbox();

describe('ShortMeeting', () => {
  afterEach(() => {
    // restore all fakes between each tests.
    sandbox.restore();
  });

  it('should redirect when is clicked.', () => {
    // Need to stub prototype according to comment on 5 jan 2018 https://github.com/enzymejs/enzyme/issues/944
    const toMeetingSpy = sandbox.stub(ShortMeeting.prototype, 'toMeeting');
    toMeetingSpy.callsFake(() => {});
    const shortMeetingWrapper = shallow(
      <ShortMeeting
        id={1}
        place="Toulouse"
        startTime="2020-04-01T10:00:00Z"
        subtitle="beginner class"
        title="learn reactjs"/>);

    shortMeetingWrapper.find(Card).simulate('click');
    expect(toMeetingSpy).to.have.been.calledOnce();
  });
});
