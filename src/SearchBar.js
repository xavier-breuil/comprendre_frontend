import { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr);

import appTexts from './texts.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      date: new Date(),
      topic: ''
    };
    this.search = this.search.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  search(event) {
    // Prevent default redirection.
    event.preventDefault();
    // TODO: fetch relevant meeting.
    console.log(this.state);
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
              placeholder={appTexts.city}
              value={this.state.city}
              onChange={this.inputChange}
            />
          </Col>
          <Col xs="auto">
            <Form.Control
              className="m-2"
              name="topic"
              placeholder={appTexts.topic}
              value={this.topic}
              onChange={this.inputChange}
            />
          </Col>
          <Col xs="auto">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              locale="fr"
              name="date"
              selected={this.state.date}
              onChange={date => this.setState({ date })}
              className="form-control m-2"
            />
          </Col>
          <Col xs="auto">
            <Button className="m-2" type="submit">
              {appTexts.search}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default SearchBar;
