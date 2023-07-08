import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import TwoColumnList from "../../components/TwoColumnList";
import products from "../../data/product.db.json";
import { IRootState, useAppSelector } from "../../redux/core";
import { useNavigation } from "@react-navigation/native";

const ProductsScreen = () => {
  const navigation = useNavigation();
  const { shopCart } = useAppSelector(
    (state: IRootState) => state.productReducer
  );
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {shopCart.length > 0 && (
        <TouchableOpacity style={styles.shopCartIcon} onPress={()=>{
          navigation.navigate("ShopCart" as never)
        }}>
          <Text>Cart</Text>
        </TouchableOpacity>
      )}
      <TwoColumnList products={products} />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  shopCartIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    height: 75,
    width: 75,
    borderRadius: 100,
    zIndex: 10,
    elevation: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
