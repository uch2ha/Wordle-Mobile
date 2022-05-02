import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Header } from "react-native-elements";
import { Icon } from "react-native-elements";
import { colors } from "./src/tools";
import { useState, useEffect } from "react";
import Game from "./src/components/Game/Game";

export default function App() {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         {/* <Header
            // statusBarProps={{ barStyle: "light-content" }}
            // barStyle="light-content"
            backgroundColor="black"
            containerStyle={{}}
            leftComponent={{
               icon: "menu",
               color: "white",
            }}
            centerComponent={<Text style={styles.title}>WORDLE</Text>}
            rightComponent={{
               icon: "home",
               color: "#eee",
               // onPress: () => forceUpdate(),
            }}
         /> */}
         <View>
            <Text style={styles.title}>WORDLE</Text>
         </View>
         <Game />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.black,
      alignItems: "center",
      paddingTop: Platform.OS === "android" ? 30 : 0,
   },
   title: {
      color: colors.lightgrey,
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 5,
   },
});
