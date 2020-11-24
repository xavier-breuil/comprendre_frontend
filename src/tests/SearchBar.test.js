/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SearchBar from '../SearchBar.js';

const sandbox = sinon.createSandbox();

describe('SearchBar', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should update state when modifying form.', () => {
    const searchWrapper = shallow(<SearchBar />);
    searchWrapper.find('#date-input').props().onChange('2020-04-01');
    searchWrapper.find('#city-input')
      .simulate('change', {
        target: {
          name: 'city',
          value: 'toulouse'
        }
      });
    expect(searchWrapper.state('city')).to.eql('toulouse');
    expect(searchWrapper.state('date')).to.eql('2020-04-01');
  });

  it('should parse data and call app filter method.', () => {
    const filterSpy = sandbox.spy();
    const searchWrapper = shallow(<SearchBar filterData={filterSpy} />);
    searchWrapper.setState({
      city: 'Glasgow',
      date: new Date(2020, 3, 1),
      topic: 'rain'
    });
    // Just mocking clicking on submit button won't work to check the values returned to the app.
    // https://github.com/enzymejs/enzyme/issues/308
    // We need to test search separatly.
    // eslint-disable-next-line no-empty-function
    searchWrapper.instance().search({ preventDefault: () => { } });
    expect(filterSpy).to.have.been.calledWith({
      date: '2020-04-01',
      place: 'Glasgow',
      tags: 'rain'
    });
  });

  it('should have empty date state.', () => {
    const filterSpy = sandbox.spy();
    const searchWrapper = shallow(<SearchBar filterData={filterSpy} />);
    searchWrapper.setState({
      city: 'Toulouse',
      topic: 'sun'
    });
    // eslint-disable-next-line no-empty-function
    searchWrapper.instance().search({ preventDefault: () => { } });
    expect(filterSpy).to.have.been.calledWith({
      date: '',
      place: 'Toulouse',
      tags: 'sun'
    });
  });
});
