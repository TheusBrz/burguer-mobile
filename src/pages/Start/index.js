import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

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
    setTimeout(() => {
      const { navigation } = this.props;

      navigation.navigate('Main');
    }, 2000);
  }

  render() {
    return (
      <Loading>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Start.defaultProps = {};

export default Start;
