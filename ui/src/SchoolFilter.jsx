/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
import {
  ButtonToolbar, Button, FormGroup, FormControl, ControlLabel, InputGroup, Row, Col,
} from 'react-bootstrap';

class SchoolFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      state: params.get('state') || '',
      ratingMin: params.get('ratingMin') || '',
      ratingMax: params.get('ratingMax') || '',
      changed: false,
    };
    this.onChangeState= this.onChangeState.bind(this);
    this.onChangeRatingMin = this.onChangeRatingMin.bind(this);
    this.onChangeRatingMax = this.onChangeRatingMax.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeState(e) {
    this.setState({ state: e.target.value, changed: true });
  }

  onChangeRatingMin(e) {
    const ratingString = e.target.value;
    if (ratingString.match(/^\d*$/)) {
      this.setState({ ratingMin: e.target.value, changed: true });
    }
  }

  onChangeRatingMax(e) {
    const ratingString = e.target.value;
    if (ratingString.match(/^\d*$/)) {
      this.setState({ ratingMax: e.target.value, changed: true });
    }
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      state: params.get('state') || '',
      ratingMin: params.get('ratingMin') || '',
      ratingMax: params.get('ratingMax') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { state, ratingMin, ratingMax } = this.state;
    const { history } = this.props;
    const params = new URLSearchParams();
    if (state) params.set('state', state);
    if (ratingMin) params.set('ratingMin', ratingMin);
    if (ratingMax) params.set('ratingMax', ratingMax);

    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({ pathname: '/schools', search });
  }

  render() {
    const { state, changed } = this.state;
    const { ratingMin, ratingMax } = this.state;

    return (
      <Row>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>State:</ControlLabel>
            <FormControl
              componentClass="select"
              value={state}
              onChange={this.onChangeState}
            >
              <option value="">(All)</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="PA">PR</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </FormControl>
          </FormGroup>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2}>
          <FormGroup>
            <ControlLabel>&nbsp;</ControlLabel>
            <ButtonToolbar>
              <Button bsStyle="primary" type="button" onClick={this.applyFilter}>
                Apply
              </Button>
              <Button
                type="button"
                onClick={this.showOriginalFilter}
                disabled={!changed}
              >
                Reset
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Col>
      </Row>
    );
  }
}


export default withRouter(SchoolFilter);