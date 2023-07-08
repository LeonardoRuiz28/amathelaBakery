import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ICartProduct, IProduct } from "../../../../models/product";
import products from "../../../../data/product.db.json";
import {
  IRootState,
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/core";
import {
  setShopCartProduct,
  updateShopCart,
} from "../../../../redux/reducers/products/productsActions";

const ProductDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { id } = route.params as { id: number };
  const [existOnCart, setExistOnCart] = useState(false);
  const [currentProduct, setcurrentProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState(1);
  const { shopCart } = useAppSelector(
    (state: IRootState) => state.productReducer
  );

  useEffect(() => {
    getProduct(id);
  }, []);

  const getProduct = (_id: number) => {
    const existOnCart = shopCart.find((e) => e.product.id === id);
    if (existOnCart) {
      setExistOnCart(true);
      setcurrentProduct(existOnCart.product);
      setQuantity(existOnCart.quantity);
    } else {
      setExistOnCart(false);
      const _product = products.find((e) => e.id === _id);
      setcurrentProduct(_product);
    }
  };

  const handleAddToCart = (product: IProduct, quantity: number) => {
    let shopCartProduct: ICartProduct = {
      product,
      quantity,
      totalPrice: product.price * quantity,
    };

    dispatch(setShopCartProduct(shopCartProduct));
    navigation.goBack();
  };

  const handleUpdateProduct = (product: IProduct, quantity: number) => {
    const updatedCart = shopCart.map((cartProduct) => {
      if (cartProduct.product.id === product.id) {
        return {
          ...cartProduct,
          quantity,
          totalPrice: product.price * quantity,
        };
      }
      return cartProduct;
    });
    dispatch(updateShopCart(updatedCart));
    navigation.goBack();
  };

  return currentProduct ? (
    <View style={styles.container}>
      <Image source={{ uri: currentProduct.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{currentProduct.name}</Text>
        <Text style={styles.description}>{currentProduct.description}</Text>
        <Text style={styles.price}>Price: ${currentProduct.price}</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          !existOnCart
            ? handleAddToCart(currentProduct, quantity)
            : handleUpdateProduct(currentProduct, quantity);
        }}
      >
        <Text style={styles.addToCartButtonText}>{`${
          !existOnCart ? "Añadir al carrito" : "Actualizar en carrito"
        }`}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <Text>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  counterButtonText: {
    fontSize: 24,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#e67e22",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
