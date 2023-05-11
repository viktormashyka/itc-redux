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
import { cardActions } from "../../features/card/cardSlice";
import uuid from "react-native-uuid";

const initialCardState = { cardName: "", cardDetails: "", cardPrice: "" };

const CardScreen = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cardCollection);
  console.log("cards: ", cards);
  const totalPrice = cards.reduce((total, card) => {
    console.log("total: ", total);
    console.log("card: ", card);
    return total + +card.price;
  }, 0);

  const [cardData, setCardData] = useState(initialCardState);

  const card = useSelector((state) => state.card);

  const renderEmptyListMessage = () => {
    return (
      <View style={styles.listEmpty}>
        <Text style={styles.text}>No data found</Text>
      </View>
    );
  };
  const renderSeparatorItem = () => {
    return <View style={{ backgroundColor: "#3b5998", height: 5 }}></View>;
  };
  const renderHeaderList = () => {
    return <View style={{ backgroundColor: "#192f6a", height: 5 }}></View>;
  };
  const renderFooterList = () => {
    return <View style={{ backgroundColor: "#192f6a", height: 5 }}></View>;
  };

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.form}>
        <Text style={styles.title}>Card</Text>
        <TextInput
          style={styles.input}
          value={cardData.cardName}
          onChangeText={(changedText) => {
            setCardData((prevState) => {
              return { ...prevState, cardName: changedText };
            });
          }}
          placeholder="Card Name"
        />
        <TextInput
          style={styles.input}
          value={cardData.cardDetails}
          onChangeText={(changedText) => {
            setCardData((prevState) => {
              return { ...prevState, cardDetails: changedText };
            });
          }}
          placeholder="Card Details"
        />
        <TextInput
          style={styles.input}
          value={cardData.cardPrice}
          onChangeText={(changedText) => {
            setCardData((prevState) => {
              return { ...prevState, cardPrice: changedText };
            });
          }}
          placeholder="Car Price"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              !cardData.cardName ||
              !cardData.cardDetails ||
              !cardData.cardPrice
            ) {
              Alert.alert("all fields shouldn't be empty");
              return;
            }
            dispatch(
              cardActions.addNewCard({
                id: uuid.v4(),
                name: cardData.cardName,
                details: cardData.cardDetails,
                price: cardData.cardPrice,
              })
            );
            setCardData(initialCardState);
          }}
        >
          <Text style={styles.text}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.title}>List of cards</Text>
          <Text style={styles.text}>
            Total items in the basket: {cards.length}
          </Text>
          <Text style={styles.text}>
            Total price all items in the basket: {totalPrice} pounds
          </Text>
        </View>
        <FlatList
          data={card.cardCollection}
          ListEmptyComponent={renderEmptyListMessage}
          ItemSeparatorComponent={renderSeparatorItem}
          ListHeaderComponent={renderHeaderList}
          ListFooterComponent={renderFooterList}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginHorizontal: 20,
                }}
              >
                <View style={{ flex: 1, marginBottom: 5 }}>
                  {/* <Text>{item.id}</Text> */}
                  <Text style={styles.text}>Name: {item.name}</Text>
                  <Text style={styles.text}>Details: {item.details}</Text>
                  <Text style={styles.text}>Price: {item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    dispatch(
                      cardActions.deleteCard({
                        id: item.id,
                        // name: item.name,
                        // details: item.details,
                        // price: item.price,
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

export default CardScreen;
