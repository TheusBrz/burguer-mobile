import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Platform, Dimensions, StatusBar,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ItemsActions } from '~/store/ducks/items';

import Modal from 'react-native-modal';

import PropTypes from 'prop-types';

import { colors } from '~/styles';
import { Container } from '~/styles/general';

class Edit extends Component {
  state = { modalVisible: false }

  componentDidMount() {
    const { item } = this.props;

    console.tron.log(item);
  }

  toggleModal = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  }

  render() {
    const {
      item, addOne, remOne, ingredients,
    } = this.props;
    const { modalVisible } = this.state;

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

    return (
      <Container>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />
        <Text>{item.name}</Text>

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

            <TouchableOpacity
              onPress={() => { addOne(ing); }}
            >
              <Text>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { remOne(ing); }}
            >
              <Text>-</Text>
            </TouchableOpacity>

          </View>
        ))}

        <TouchableOpacity
          onPress={() => this.toggleModal()}
        >
          <Text>Adicionar novo ingrediente</Text>
        </TouchableOpacity>

        <Text>
          {item.total}
        </Text>

        <TouchableOpacity
          onPress={() => {}}
        >
          <Text>Finalizar Edição</Text>
        </TouchableOpacity>


        <Modal
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.white,
          }}
          >
            {ingredients.map(ing => (
              <View key={ing.id}>
                <Text>{ing.name}</Text>
              </View>
            ))}

            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Container>
    );
  }
}

Edit.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ])),
  ingredients: PropTypes.arrayOf(PropTypes.object),
  addOne: PropTypes.func,
  remOne: PropTypes.func,
};

Edit.defaultProps = {
  item: {},
  ingredients: [],
  addOne: () => {},
  remOne: () => {},
};

const mapStateToProps = state => ({
  item: state.items.item,
  ingredients: state.ingredients,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addOne: ItemsActions.addOne,
    remOne: ItemsActions.remOne,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
