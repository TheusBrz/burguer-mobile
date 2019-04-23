import React, { Component } from 'react';
import {
  Alert, FlatList, StatusBar, View,
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
  Header,
  Title,
  Container,
  Burguer,
  Ingredient,
  IngName,
  IngPrice,
  Action,
  ActionText,
  Separator,
  Promotion,
  Finish,
  FinishText,
} from '~/styles/general';

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
      : { total: 0.00 };

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
              <Title>Meu pedido:</Title>
            </Header>
          )}
          renderItem={({ item }) => {
            const contain = item.ingredients.filter(ing => ing.amount >= 1);

            return (
              <Burguer.Container>
                <Burguer.Header>
                  <Burguer.Name>{item.name}</Burguer.Name>

                  <Burguer.Actions
                    onPress={() => edit(item)}
                  >
                    <FontAwesome
                      name="pencil"
                      size={15}
                      color={colors.white}
                    />
                  </Burguer.Actions>

                  <Burguer.Actions
                    onPress={() => remove(item)}
                  >
                    <FontAwesome
                      name="trash"
                      size={15}
                      color={colors.white}
                    />
                  </Burguer.Actions>
                </Burguer.Header>


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

                <Burguer.Footer style={{ justifyContent: 'space-between' }}>


                  {(item.promotions.isLight) && (
                  <Promotion style={{ color: colors.green }}>
                    Light!
                  </Promotion>
                  )}

                  {(item.promotions.muchMeat) && (
                  <Promotion style={{ color: colors.red }}>
                    Muita carne!
                  </Promotion>
                  )}

                  {(item.promotions.muchCheese) && (
                  <Promotion style={{ color: colors.yellow }}>
                    Muito queijo!
                  </Promotion>
                  )}

                  <View />

                  <IngPrice>
                    Total: R$
                    {' '}
                    {parseFloat(item.total).toFixed(2).replace('.', ',').trim()}
                  </IngPrice>
                </Burguer.Footer>
              </Burguer.Container>
            );
          }}
          ItemSeparatorComponent={() => <Separator />}
          ListFooterComponent={() => (
            <React.Fragment>
              <Separator />
              <Burguer.Container>
                <IngPrice>
                  Total: R$
                  {parseFloat(basketTotal.total).toFixed(2).replace('.', ',').trim()}
                </IngPrice>
              </Burguer.Container>

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
              : () => { Alert.alert('Burguer.Container concluído!', `Seu pedido ficou com um total de R$ ${parseFloat(basketTotal.total).toFixed(2).replace('.', ',').trim()}`); }
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
