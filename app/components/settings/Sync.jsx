// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class Sync extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.sync);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => {
      this.props.updateSettings('sync', this.state);
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="pageItem">
              <label className="itemLabel">
                {t('settings:fields:couchDBUrl')}
              </label>
              <input
                placeholder="http://username:password@ec2-xx-xx-xx-xx.compute-1.amazonaws.com:5984"
                value={this.props.sync.couchDBUrl}
                onChange={this.handleInputChange}
                type="text"
                name="couchDBUrl"
                id="couchDBUrl"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sync.propTypes = {
  sync: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Sync);
