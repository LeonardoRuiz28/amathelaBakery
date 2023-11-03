import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../../screens/products";
import ProductDetailScreen from "../../screens/products/screens/productDetail";
import ShopCartScreen from "../../screens/products/screens/shopCart";
import info from "../../data/info.db.json";
import CustomHeader from "../customHeader";
import { ImageBackground } from "react-native";



const Stack = createStackNavigator();

function ProductStack() {
  return (
    <ImageBackground
    source={{ uri: info.image }}
    style={{ flex: 1 }}>
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={ProductsScreen}
        options={{ header: () => <CustomHeader info={info} />}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Detalle" }}
        initialParams={{ id: 0 }}
      />
      <Stack.Screen
        name="ShopCart"
        component={ShopCartScreen}
        options={{ title: "Carrito de compras" }}
      />
    </Stack.Navigator>
    </ImageBackground>
  );
}

export default ProductStack;
