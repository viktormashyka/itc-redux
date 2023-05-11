import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { carActions } from "../../features/car/carSlice";
import uuid from "react-native-uuid";

const CarsScreen = () => {
  const dispatch = useDispatch();

  const [carBrand, setCarBrand] = useState("");
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");

  const car = useSelector((state) => state.car);

  const renderSeparatorItem = () => {
    return <View style={{ backgroundColor: "#3b5998", height: 5 }}></View>;
  };

  const renderHeaderList = () => {
    return <View style={{ backgroundColor: "#192f6a", height: 5 }}></View>;
  };

  const renderFooterList = () => {
    return <View style={{ backgroundColor: "#192f6a", height: 5 }}></View>;
  };

  const handleChangeFilter = (evt) => {
    const filter = evt.currentTarget.value;
    dispatch(carActions.findCarByBrand(filter));
    console.log("filter: ", filter);
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.form}>
        <Text style={styles.title}>Car</Text>
        <TextInput
          style={styles.input}
          value={carBrand}
          onChangeText={(changedText) => {
            setCarBrand(changedText);
          }}
          placeholder="Car Brand"
        />
        <TextInput
          style={styles.input}
          value={carName}
          onChangeText={(changedText) => {
            setCarName(changedText);
          }}
          placeholder="Car Name"
        />
        <TextInput
          style={styles.input}
          value={carModel}
          onChangeText={(changedText) => {
            setCarModel(changedText);
          }}
          placeholder="Car Model"
        />
        <TextInput
          style={styles.input}
          value={carColor}
          onChangeText={(changedText) => {
            setCarColor(changedText);
          }}
          placeholder="Car Color"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!carBrand || !carName || !carModel || !carColor) {
              Alert.alert("all fields shouldn't be empty");
              return;
            }
            dispatch(
              carActions.addNewCar({
                id: uuid.v4(),
                brand: carBrand,
                name: carName,
                model: carModel,
                color: carColor,
              })
            );
            setCarBrand("");
            setCarName("");
            setCarModel("");
            setCarColor("");
          }}
        >
          <Text style={styles.text}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.title}>List of all cars</Text>
        </View>
        <FlatList
          data={car.carCollection}
          ItemSeparatorComponent={renderSeparatorItem}
          ListHeaderComponent={renderHeaderList}
          ListFooterComponent={renderFooterList}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  gap: 50,
                  flexDirection: "row",
                  marginHorizontal: 20,
                }}
              >
                <View style={{}}>
                  {/* <Text>{item.id}</Text> */}
                  <Text style={styles.text}>Brand: {item.brand}</Text>
                  <Text style={styles.text}>Name: {item.name}</Text>
                  <Text style={styles.text}>Model: {item.model}</Text>
                  <Text style={styles.text}>Color: {item.color}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    dispatch(
                      carActions.deleteCar({
                        id: uuid.v4(),
                        // brand: item.brand,
                        // name: item.name,
                        // model: item.model,
                        // color: item.color,
                      })
                    );
                  }}
                >
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  form: {
    marginHorizontal: 16,
  },
  button: {
    height: 50,
    marginTop: 43,
    gap: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: { borderColor: "#FF6C00", backgroundColor: "transparent" },
      android: { borderColor: "#FF6C00", backgroundColor: "#FF6C00" },
    }),
    borderRadius: 20,
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    // color: '#212121',
    color: "#192f6a",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Georgia",
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Georgia",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
    color: "#212121",
  },
  // input: {
  //   width: '80%',
  //   padding: 10,
  //   marginVertical: 5,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   borderColor: 'gray',
  // },
  // inputError: {
  //   borderColor: 'red',
  // },
  error: {
    color: "red",
    marginBottom: 10,
  },
  text: {
    marginTop: 16,
    fontFamily: "Georgia",
    fontStyle: "normal",
    color: "#192f6a",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  // btnTitle: {
  //   color: Platform.OS === 'ios' ? '#4169e1' : '#f0f8ff',
  //   fontFamily: 'Georgia',
  //   fontStyle: 'normal',
  //   fontSize: 16,
  //   lineHeight: 19,
  //   textAlign: 'center',
  // },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default CarsScreen;
