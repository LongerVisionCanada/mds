import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { getUserAccessData } from '@/selectors/authenticationSelectors';
import { USER_ROLES } from '@/constants/environment';

export const CreateGuard = (WrappedComponent) => {
  class CreateGuard extends Component {
    render() {
        if (this.props.userRoles.indexOf(USER_ROLES.role_create) >= 0) {
          return (
            <WrappedComponent {...this.props} />
          );
        } else {
          return (<div />)
        }
    }
  }

  hoistNonReactStatics(CreateGuard, WrappedComponent);

  const mapStateToProps = (state) => {
    return {
      userRoles: getUserAccessData(state),
    };
  };

  return connect(mapStateToProps, null)(CreateGuard);
};