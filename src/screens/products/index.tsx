import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TwoColumnList from "../../components/TwoColumnList";
import products from "../../data/product.db.json";

const ProductsScreen = () => {
  return (
    <View>
      <Text style={styles.title}>Productos</Text>
      <TwoColumnList products={products} />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
  },
});
