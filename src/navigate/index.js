import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  DetailsScreen,
  LoginScreen,
  ExpMemo,
  CarsScreen,
  CardScreen,
} from "../containers";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const auth = useSelector((state) => state.auth);

  getHomeStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cars" component={CarsScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="expMemo" component={ExpMemo} />
        <Stack.Screen name="Card" component={CardScreen} />
      </Stack.Group>
    );
  };

  getAuthStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>
      {auth.isLoggedIn ? getHomeStack() : getAuthStack()}
    </Stack.Navigator>
  );
};

export default Navigation;
