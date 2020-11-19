// Use chai and associate plugins for tests.
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import createChaiJestDiff from 'chai-jest-diff';
import {configure as configureEnzyme} from 'enzyme';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

chai
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(chaiEnzyme())
  .use(sinonChai);

configureEnzyme({adapter: new Adapter()});
