import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutUsScreen from "../../screens/aboutUs";
import FavoritesScreen from "../../screens/favorites";
import ProductsScreen from "../../screens/products";
import ProductStack from "../productStack";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="products"
        component={ProductStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="favorites" component={FavoritesScreen} />
      <Tab.Screen name="aboutUs" component={AboutUsScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
