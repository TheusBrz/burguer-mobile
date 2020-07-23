import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '~/store/ducks';

import { PacmanIndicator } from 'react-native-indicators';

import { colors } from '~/styles';
import { Loading, Logo, Version } from './styles';

/**
 * Essa página pode ser utilizada para quaisquer
 * funcionalidades do começo da aplicação
 * carrengando informações do banco ou API
 */
class Start extends Component {
  componentDidMount() {
    const { load } = this.props;
    setTimeout(() => {
      load();
    }, 2000);
  }

  render() {
    return (
      <Loading>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="dark-content"
        />
        <Logo>
          Native
          {'\n'}
          Burguer
        </Logo>

        <Version>Versão: 1.0.0</Version>

        <PacmanIndicator style={{ flex: 0 }} color={colors.option} size={50} />
      </Loading>
    );
  }
}

Start.propTypes = {
  load: PropTypes.func,
};

Start.defaultProps = {
  load: () => {},
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    load: Creators.load,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start);
