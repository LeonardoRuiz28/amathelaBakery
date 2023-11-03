import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import TwoColumnList from "../../components/TwoColumnList";
import products from "../../data/product.db.json";
import { IRootState, useAppSelector } from "../../redux/core";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import info from "../../data/info.db.json";

const ProductsScreen = () => {
  const navigation = useNavigation();
  const { shopCart } = useAppSelector(
    (state: IRootState) => state.productReducer
  );
  return (
    <ImageBackground source={{ uri: info.image }} style={{ flex: 1 }}>
              <Text style={{ display: "flex", justifyContent: "center" ,alignItems:"center" ,fontWeight:"bold" }}>
          Catalogo de Productos
        </Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {shopCart.length > 0 && (
          <TouchableOpacity
            style={styles.shopCartIcon}
            onPress={() => {
              navigation.navigate("ShopCart" as never);
            }}
          >
            <FontAwesome color={"white"} name="shopping-cart" size={30} />
          </TouchableOpacity>
        )}
        <TwoColumnList products={products} />
      </View>
    </ImageBackground>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  shopCartIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#9C7C38",
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
