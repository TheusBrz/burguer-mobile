import React, { Component } from 'react';
import {
  Alert, FlatList, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { navigate } from '~/services/navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as BasketActions } from '~/store/ducks/basket';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialIcon from 'react-native-vector-icons/MaterialIcon';

import { colors } from '~/styles';
import {
  Container,
  Pedido,

  Burguer, BrgName, BrgActions, BrgFooter,

  Ingredient, IngName, IngPrice,

  Action, ActionText,

  Separator,

  Finish, FinishText,
} from '~/styles/general';
import {
  Header, Title,
} from './styles';

class Basket extends Component {
  componentDidMount() {
  }

  render() {
    const {
      basket, remove, edit,
    } = this.props;

    const basketTotal = (basket.length >= 1)
      ? basket.reduce((previousValue, currentValue) => ({
        total: (previousValue.total) + (currentValue.total),
      }))
      : 0.00;

    return (
      <Container>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />

        <FlatList
          data={basket}
          keyExtractor={item => `${item.id}`}
          ListHeaderComponent={() => (
            <Header>
              <Title>
                Meu
                {'\n'}
                pedido:
              </Title>
            </Header>
          )}
          renderItem={({ item }) => {
            const contain = item.ingredients.filter(ing => ing.amount >= 1);

            return (
              <Pedido>
                <Burguer>
                  <BrgName>{item.name}</BrgName>

                  <BrgActions
                    onPress={() => edit(item)}
                  >
                    <FontAwesome
                      name="pencil"
                      size={15}
                      color={colors.white}
                    />
                  </BrgActions>

                  <BrgActions
                    onPress={() => remove(item)}
                  >
                    <FontAwesome
                      name="trash"
                      size={15}
                      color={colors.white}
                    />
                  </BrgActions>
                </Burguer>


                {(contain.length >= 1) && contain.map(ing => (
                  <Ingredient key={ing.id}>
                    <IngName>{ing.name}</IngName>

                    <IngPrice>
                      Qtde:
                      {' '}
                      {ing.amount}
                    </IngPrice>

                    <IngPrice>
                      R$
                      {parseFloat(ing.price).toFixed(2).replace('.', ',').trim()}
                    </IngPrice>
                  </Ingredient>
                ))}

                <BrgFooter>
                  <IngPrice>
                    Subtotal: R$
                    {parseFloat(item.total).toFixed(2).replace('.', ',').trim()}
                  </IngPrice>
                </BrgFooter>
              </Pedido>
            );
          }}
          ItemSeparatorComponent={() => <Separator />}
          ListFooterComponent={() => (
            <React.Fragment>
              <Separator />
              <Pedido>
                <IngPrice>
                  Total: R$
                  {parseFloat(basketTotal.total).toFixed(2).replace('.', ',').trim()}
                </IngPrice>
              </Pedido>

              <Action
                onPress={() => { navigate('Main'); }}
              >
                <ActionText>Adicionar mais itens</ActionText>
              </Action>
            </React.Fragment>
          )}
        />

        <Finish
          onPress={
            ((basket.length) < 1)
              ? () => { Alert.alert('Opa!', 'Você precisa de pelo menos 1 item na sua cesta!'); }
              : () => { Alert.alert('Pedido concluído!', `Seu pedido ficou com um total de R$ ${basketTotal.total}`); }
          }
        >
          <FinishText>FINALIZAR PEDIDO</FinishText>
        </Finish>
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
