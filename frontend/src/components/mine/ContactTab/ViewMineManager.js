import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Card } from 'antd';
import { getPersonnelById } from '@/actionCreators/personnelActionCreator';
import { getPersonnel, getPersonnelIds } from '@/selectors/personnelSelectors';
import ConditionalButton from '@/components/reusables/ConditionalButton';
import Loading from '@/components/reusables/Loading';


const propTypes = {
  getPersonnelById: PropTypes.func.isRequired,
  handleManagerUpdate: PropTypes.func.isRequired,
  mine: PropTypes.object.isRequired,
  personnel: PropTypes.object.isRequired,
  personnelIds: PropTypes.array.isRequired
};

const defaultProps = {
  mine: {},
  personnel: {},
  personnelIds: []
};

export class ViewMineManager extends Component {
  componentDidMount() {
    if (this.props.mine.mgr_appointment[0]) {
      this.props.getPersonnelById(this.props.mine.mgr_appointment[0].person_guid);
    }
  }

  render() {
    if (this.props.mine.mgr_appointment[0]) {
      return (
      this.props.personnelIds.map((id) => {
        return (
          <div key={id}>
              <Card>
                <Row gutter={16}>
                  <Col span={12}>
                    <label>Mine Manager</label>
                    <div>{this.props.personnel[id].full_name}</div>
                  </Col>
                  <Col span={12}>
                    <label>Effective date</label>
                    <div>{this.props.personnel[id].effective_date}</div>
                  </Col>
                </Row>
                <ConditionalButton handleAction={this.props.handleManagerUpdate} string="Update" type="primary"/>
              </Card>
          </div>
          );
        })
      );
    } else if (!this.props.mine.mgr_appointment[0]) {
      return (
        <div>
          <div>The mine does not currently have a mine Manager</div>
          <ConditionalButton handleAction={this.props.handleManagerUpdate} string="Update" type="primary"/>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

ViewMineManager.propTypes = propTypes;
ViewMineManager.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    personnel: getPersonnel(state),
    personnelIds: getPersonnelIds(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getPersonnelById
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMineManager);