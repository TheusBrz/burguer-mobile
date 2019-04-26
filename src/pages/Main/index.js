import React, { Component } from 'react';
import { FlatList, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { navigate } from '~/services/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '~/store/ducks';

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
      combos, add, basket, edit,
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
                  : () => { add({ item }); }}
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
          <Icon name="shopping-basket" size={26} color={colors.option} />
        </Fab>
        )}
      </Container>
    );
  }
}

Main.propTypes = {
  combos: PropTypes.arrayOf(PropTypes.object),
  basket: PropTypes.arrayOf(PropTypes.object),
  add: PropTypes.func,
  edit: PropTypes.func,
};

Main.defaultProps = {
  combos: [],
  basket: [],
  add: () => {},
  edit: () => {},
};

const mapStateToProps = state => ({
  combos: state.data,
  basket: state.basket,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    add: Creators.add,
    edit: Creators.edit,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
