import React, { Component } from 'react';
import {
  View, Text, FlatList, StatusBar, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { navigate } from '~/services/navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as BasketActions } from '~/store/ducks/basket';

// import Accordion from 'react-native-collapsible/Accordion';

import { colors } from '~/styles';
import {
  Container,
} from '~/styles/general';
import {
  Header, Title, /* Option, */ OptionText, Separator, /* Ingredient, IngredientText, */
} from './styles';

class Basket extends Component {
  componentDidMount() {

  }

  render() {
    const { basket, remove, edit } = this.props;

    return (
      <Container>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />

        <Header>
          <Title>Meus pedido:</Title>
        </Header>

        <FlatList
          data={basket}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <View>
              <View>
                <TouchableOpacity
                  onPress={() => remove(item)}
                >
                  <Text>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => edit(item)}
                >
                  <Text>Editar</Text>
                </TouchableOpacity>
                <Text>{item.name}</Text>
              </View>
              {item.ingredients.map(ing => (
                <View key={ing.id}>
                  <Text>
                    -
                    {ing.name}
                    {' '}
                    {ing.amount}
                    {' '}
                    R$
                    {ing.price}
                  </Text>
                </View>
              ))}
            </View>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />

        <TouchableOpacity
          onPress={() => { navigate('Main'); }}
        >
          <OptionText>Adicionar mais itens</OptionText>
        </TouchableOpacity>

        <TouchableOpacity>
          <OptionText>Finalizar compra</OptionText>
        </TouchableOpacity>
      </Container>

    );
  }
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func,
  edit: PropTypes.func,
};

Basket.defaultProps = {
  basket: [],
  remove: () => {},
  edit: () => {},
};

const mapStateToProps = state => ({
  basket: state.basket.items,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    remove: BasketActions.rem,
    edit: BasketActions.edit,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Basket);
