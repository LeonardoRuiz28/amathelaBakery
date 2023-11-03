import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutUsScreen from "../../screens/aboutUs";
import FavoritesScreen from "../../screens/favorites";
import ProductsScreen from "../../screens/products";
import ProductStack from "../productStack";
import { Text, View, Image } from "react-native";
import { IInfo } from "../../models/info";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

interface Props {
  data: IInfo;
}

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ProductStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                color={focused?"#1DA1F2":"black"}
                name="home"
                size={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <FontAwesome name="heart" size={20} color={focused?"red":"black"} />;
          },
        }}
      />
      <Tab.Screen
        name="aboutUs"
        component={AboutUsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <FontAwesome name="users" size={20} color={focused?"#1DA1F2":"black"} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
