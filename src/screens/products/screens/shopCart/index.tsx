import { useNavigation } from "@react-navigation/native";
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
import {
  IRootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/core";
import { updateShopCart } from "../../../../redux/reducers/products/productsActions";

const ShopCartScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { shopCart } = useAppSelector(
    (state: IRootState) => state.productReducer
  );

  const renderCartItem = ({ item }: { item: ICartProduct }) => {
    const { product, quantity, totalPrice } = item;

    const onRemoveProduct = (id: number) => {
      const updatedCart = shopCart.filter(
        (cartProduct) => cartProduct.product.id !== id
      );
      dispatch(updateShopCart(updatedCart));
    };

    const onEditProduct = (id: number) => {
      navigation.navigate("ProductDetail" as never, { id } as never);
    };

    return (
      <View style={styles.cartItemContainer}>
        <Image source={{ uri: product.image }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemName}>{product.name}</Text>
          <Text style={styles.cartItemQuantity}>Cantidad: {quantity}</Text>
          <Text style={styles.cartItemPrice}>Precio total: ${totalPrice}</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <TouchableOpacity onPress={() => onRemoveProduct(product.id)}>
              <Text style={styles.removeButton}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEditProduct(product.id)}>
              <Text style={styles.removeButton}>Editar</Text>
            </TouchableOpacity>
          </View>
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
          style={styles.cartListContainer}
        />
      ) : (
        <Text style={styles.emptyCartText}>Tu carrito está vacío.</Text>
      )}
      {shopCart.length > 0 && (
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
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
  cartListContainer: {
    maxHeight: 400,
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
  buyButton: {
    backgroundColor: "#e67e22",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShopCartScreen;
