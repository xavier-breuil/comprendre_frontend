import {expect} from 'chai';
import {shallow} from 'enzyme';
import Container from 'react-bootstrap/Container';
import App from '../App.js';

describe('App', () => {
  it('should have a container to display meetings.', () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.find(Container)).to.have.lengthOf(1);
  });
});
