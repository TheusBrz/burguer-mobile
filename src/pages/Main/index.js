import React, { Component } from 'react';
import { FlatList, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { navigate } from '~/services/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CombosActions } from '~/store/ducks/combos';
import { Creators as BasketActions } from '~/store/ducks/basket';

import { colors } from '~/styles';
import {
  Header, Title, Container, Separator, Option, OptionText,
} from '~/styles/general';
import {
  Fab,
} from './styles';

class Main extends Component {
  componentDidMount() {
  }

  render() {
    const {
      combos, request, basket, edit,
    } = this.props;

    return (
      <Container>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.background,
          }}
          keyExtractor={item => `${item.id}`}
          data={combos}
          ListHeaderComponent={() => (
            <Header>
              <Title>
                Native
                {'\n'}
                Burguers
              </Title>
            </Header>
          )}
          renderItem={({ item }) => {
            const { name } = item;
            return (
              <Option
                onPress={((name) === 'Monte do seu jeito!')
                  ? () => { edit(item); }
                  : () => { request({ item }); }}
              >
                <OptionText>{item.name}</OptionText>
              </Option>
            );
          }}
          ItemSeparatorComponent={() => <Separator />}
        />

        {(basket.length > 0)
        && (
        <Fab
          onPress={() => navigate('Basket')}
        >
          <Icon name="shopping-basket" size={24} color={colors.white} />
        </Fab>
        )}
      </Container>
    );
  }
}

Main.propTypes = {
  combos: PropTypes.arrayOf(PropTypes.object),
  basket: PropTypes.arrayOf(PropTypes.object),
  request: PropTypes.func,
  edit: PropTypes.func,
};

Main.defaultProps = {
  combos: [],
  basket: [],
  request: () => {},
  edit: () => {},
};

const mapStateToProps = state => ({
  combos: state.combos.combos,
  basket: state.basket.items,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    request: CombosActions.addRequest,
    edit: BasketActions.edit,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
