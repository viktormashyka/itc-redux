// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { cakeActions } from "../../features/cake/cakeSlice";
import { icecreamActions } from "../../features/icecream/icecreamSlice";
import { store } from "../../store";
import { TestComponent } from "../../components";
import { todosActions } from "../../features/todos/todosSlice";
import { bookActions } from "../../features/book/bookSlice";

const { request: todoRequest } = todosActions;

class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  };

  componentDidMount() {
    console.log("=============");
    console.log(this.props.cake);
    console.log("=============");
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "red" }}>Home Screen</Text>
        <Text style={{ color: "red" }}>{this.props.cake.numberOfCakes}</Text>
        <TestComponent></TestComponent>
        <Button
          title="Go to Details"
          onPress={() => {
            store.dispatch(cakeActions.ordered());
            store.dispatch(icecreamActions.ordered());

            this.props.navigation.navigate("Details");
          }}
        />

        <TouchableOpacity
          onPress={() => {
            this.props.todoRequest({
              url: "https://jsonplaceholder.typicode.com/todos",
            });
          }}
        >
          <Text>test todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            store.dispatch(bookActions.bookOrdered());
          }}
        >
          <Text>Order Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            store.dispatch(bookActions.bookSold());
          }}
        >
          <Text>Sell Book</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("expMemo");
          }}
        >
          <Text>Go to experiment memo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Cars");
          }}
        >
          <Text>Go to Cars screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Card");
          }}
        >
          <Text>Go to Card screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  cake: state.cake,
  book: state.book,
});

const actions = { todoRequest };

export default connect(mapStateToProps, actions)(Home);
