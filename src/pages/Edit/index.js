import React, { Component } from 'react';
import {
  Alert, View, TouchableOpacity, Platform, Dimensions, StatusBar,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '~/store/ducks';

import { navigate } from '~/services/navigation';

import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import { colors } from '~/styles';
import {
  Container,
  Header,
  Title,
  Burguer,
  Ingredient,
  IngName,
  IngPrice,
  Action,
  ActionText,
  Separator,
  Option,
  OptionText,
  Promotion,
  Finish,
  FinishText,
} from '~/styles/general';

import { AddIng } from './styles';

class Edit extends Component {
  state = { modalVisible: false }

  toggleModal = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  }

  render() {
    const {
      selected, addIng, remIng, remove, endEdit,
    } = this.props;
    const { modalVisible } = this.state;

    const more = selected.ingredients.filter(ing => ing.amount < 1);
    const contain = selected.ingredients.filter(ing => ing.amount >= 1);

    let total = 0.00;

    if ((contain.length >= 1) && (selected.promotions.isLight === true)) {
      total = contain.reduce((previousValue, currentValue) => (
        { price: (previousValue.price) + (currentValue.price) }
      ));

      total.price *= 0.9;
    } else if (contain.length >= 1) {
      total = contain.reduce((previousValue, currentValue) => (
        { price: (previousValue.price) + (currentValue.price) }
      ));
    }

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android')
        .get('REAL_WINDOW_HEIGHT');

    return (
      <Container>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />
        <Header>
          <Title>Edição de ingredientes</Title>
        </Header>

        <Burguer.Container>
          <Burguer.Header>
            <Burguer.Name>{selected.name}</Burguer.Name>
          </Burguer.Header>

          {(contain.length >= 1) && contain.map(ing => (
            <Ingredient key={ing.id}>
              <IngName>
                {ing.name}
              </IngName>

              <TouchableOpacity
                onPress={(ing.amount > 1)
                  ? () => { remIng(ing); }
                  : () => {
                    Alert.alert(
                      'Hey!',
                      'Você deseja mesmo remover este ingrediente?',
                      [
                        { text: 'Sim!', onPress: () => remIng(ing) },
                        { text: 'Não' },
                      ],
                      { cancelable: true },
                    );
                  }
              }
              >
                <FontAwesome name="minus" size={15} color={colors.white} />
              </TouchableOpacity>

              <IngPrice>
                {ing.amount}
              </IngPrice>

              <TouchableOpacity
                onPress={() => { addIng(ing); }}
              >
                <FontAwesome name="plus" size={15} color={colors.white} />
              </TouchableOpacity>

              <IngPrice>
                R$
                {parseFloat(ing.price).toFixed(2).replace('.', ',').trim()}
              </IngPrice>
            </Ingredient>
          ))}

          {(more.length >= 1) && (
          <Action
            onPress={() => this.toggleModal()}
          >
            <AddIng>Adicionar novo ingrediente</AddIng>
          </Action>
          )}

          {total !== null && (
            <Burguer.Footer style={{ justifyContent: 'space-between' }}>


              {(selected.promotions.isLight) && (
              <Promotion style={{ color: colors.green }}>
                Light!
              </Promotion>
              )}

              {(selected.promotions.muchMeat) && (
              <Promotion style={{ color: colors.red }}>
                Muita carne!
              </Promotion>
              )}

              {(selected.promotions.muchCheese) && (
              <Promotion style={{ color: colors.yellow }}>
                Muito queijo!
              </Promotion>
              )}

              <View />

              <IngPrice>
                Total: R$
                {' '}
                {parseFloat(total.price || total).toFixed(2).replace('.', ',').trim()}
              </IngPrice>
            </Burguer.Footer>
          )}
        </Burguer.Container>

        <Separator />

        <Finish
          onPress={(contain.length >= 1)
            ? () => {
              remove(selected);
              navigate('Basket');
              endEdit({ item: selected });
            }
            : () => {
              Alert.alert(
                'Opa!',
                'Você precisa de pelo menos 1 ingrediente em seu lanche!',
              );
            }
          }
        >
          <FinishText>FINALIZAR EDIÇÃO</FinishText>
        </Finish>

        <Modal
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.background,
            }}
          >
            {more.map(ing => (
              <React.Fragment
                key={ing.id}
              >
                <Option
                  onPress={() => {
                    addIng(ing);
                    this.toggleModal();
                  }}
                >
                  <OptionText>{ing.name}</OptionText>
                </Option>
                <Separator />
              </React.Fragment>
            ))}


            <Action
              onPress={() => this.toggleModal()}
            >
              <ActionText>Cancelar</ActionText>
            </Action>
          </View>
        </Modal>
      </Container>
    );
  }
}

Edit.propTypes = {
  selected: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ])),
  addIng: PropTypes.func,
  remIng: PropTypes.func,
  remove: PropTypes.func,
  endEdit: PropTypes.func,
};

Edit.defaultProps = {
  selected: {},
  addIng: () => {},
  remIng: () => {},
  remove: () => {},
  endEdit: () => {},
};

const mapStateToProps = state => ({
  selected: state.selected,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addIng: Creators.addIng,
    remIng: Creators.remIng,

    remove: Creators.rem,
    endEdit: Creators.endEdit,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
