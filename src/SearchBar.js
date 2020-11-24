import { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr);
import moment from 'moment';

import appTexts from './texts.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      topic: ''
    };
    this.search = this.search.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  search(event) {
    // Prevent default redirection.
    event.preventDefault();
    let dateParam = '';
    if (this.state.date) {
      dateParam = moment(this.state.date).format('YYYY-MM-DD');
    }
    this.props.filterData({
      date: dateParam,
      place: this.state.city,
      tags: this.state.topic
    });
  }

  inputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Form className="search-bar" onSubmit={this.search}>
        <Form.Row className="justify-content-center">
          <Col xs="auto">
            <Form.Control
              className="m-2"
              name="city"
              id="city-input"
              placeholder={appTexts.city}
              value={this.state.city}
              onChange={this.inputChange}
              autoComplete="off"
            />
          </Col>
          <Col xs="auto">
            <Form.Control
              className="m-2"
              name="topic"
              id="topic-input"
              placeholder={appTexts.topic}
              value={this.topic}
              onChange={this.inputChange}
              autoComplete="off"
            />
          </Col>
          <Col xs="auto">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              locale="fr"
              name="date"
              id="date-input"
              selected={this.state.date}
              onChange={date => this.setState({ date })}
              className="form-control m-2"
              autoComplete="off"
            />
          </Col>
          <Col xs="auto">
            <Button className="m-2" type="submit" id="filter-button">
              {appTexts.search}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
SearchBar.propTypes = {
  filterData: PropTypes.func
};

export default SearchBar;
