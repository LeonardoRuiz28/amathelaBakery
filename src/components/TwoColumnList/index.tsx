import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { IProduct } from "../../models/product";

interface Props {
  products: IProduct[];
}

const TwoColumnList: React.FC<Props> = ({ products }) => {
  const navigation = useNavigation();

  const handleProductPress = (product: IProduct) => {
    navigation.navigate("ProductDetail" as never, { id: product.id } as never);
  };

  const renderItem = ({ item }: { item: IProduct }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});

export default TwoColumnList;
