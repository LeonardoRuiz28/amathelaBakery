import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../../screens/products";
import ProductDetailScreen from "../../screens/products/screens/productDetail";
import ShopCartScreen from "../../screens/products/screens/shopCart";

const Stack = createStackNavigator();

function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={ProductsScreen}
        options={{ title: "Productos" }}
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
  );
}

export default ProductStack;
