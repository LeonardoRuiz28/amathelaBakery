import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ICartProduct } from "../../../../models/product";
import { IRootState, useAppSelector } from "../../../../redux/core";

const ShopCartScreen: React.FC = () => {
  const { shopCart } = useAppSelector(
    (state: IRootState) => state.productReducer
  );

  const renderCartItem = ({ item }: { item: ICartProduct }) => {
    const { product, quantity, totalPrice } = item;

    const onRemoveProduct = (id: number) => {};

    return (
      <View style={styles.cartItemContainer}>
        <Image source={{ uri: product.image }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemName}>{product.name}</Text>
          <Text style={styles.cartItemQuantity}>Cantidad: {quantity}</Text>
          <Text style={styles.cartItemPrice}>Precio total: ${totalPrice}</Text>
          <TouchableOpacity onPress={() => onRemoveProduct(product.id)}>
            <Text style={styles.removeButton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {shopCart.length > 0 ? (
        <FlatList
          data={shopCart}
          keyExtractor={(item) => item.product.id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={styles.cartList}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartList: {
    flexGrow: 1,
  },
  cartItemContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cartItemQuantity: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  removeButton: {
    fontSize: 16,
    color: "red",
    textDecorationLine: "underline",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default ShopCartScreen;
