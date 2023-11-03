import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const AboutUsScreen = () => {
  const phoneNumber = "+51 962 367 736";
  const facebookUrl = "https://www.facebook.com/example";
  const twitterUrl = "https://www.twitter.com/example";
  const instagramUrl = "https://www.instagram.com/amathelapastry/";

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  const openWspp = ()=>
  {
    Linking.openURL('whatsapp://send?text=HelloAmathela&phone=939502762')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de nosotros</Text>
      <Text style={styles.description}>
        Amathela Pastry | Pastelería Artesanal Tienda de postres • Cakes • Bocaditos • Postres • Boxes
      </Text>
      <Text style={styles.description}>Ama y comparte tu día con un postre</Text>
      <Text style={styles.description}>Ubicanos : 📍 CC Open Plaza - La Marina</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>Contact us: {phoneNumber}</Text>
        <View style={styles.socialMediaContainer}>
          <FontAwesome
          color={'#4267B2'}
            name="facebook"
            style={styles.socialIcon}
            onPress={() => openUrl(facebookUrl)}
          />
          <FontAwesome
            color={'#1DA1F2'}
            name="twitter"
            style={styles.socialIcon}
            onPress={() => openWspp()}
          />
          <FontAwesome
          color={'#833AB4'}
            name="instagram"
            style={styles.socialIcon}
            onPress={() => openUrl(instagramUrl)}
          />
        </View>
      </View>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
  },
  contactContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  contactText: {
    fontSize: 18,
    marginBottom: 8,
  },
  socialMediaContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  socialIcon: {
    fontSize: 24,
    marginHorizontal: 8,
  },
});
