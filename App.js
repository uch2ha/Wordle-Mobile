import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Header } from "react-native-elements";
import { Icon } from "react-native-elements";
import { colors } from "./src/tools";
import { useState, useEffect } from "react";
import Game from "./src/components/Game/Game";

const CUSTOM_DATA = require("./src/data/english_words.json");

export default function App() {
   const getNewWord = () => {
      const wordList = CUSTOM_DATA[Math.floor(Math.random() * 3 + 4)];
      let new_word = wordList[Math.floor(Math.random() * wordList.length)];
      console.log(new_word);
      return new_word;
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         <View>
            <Text style={styles.title}>WORDLE</Text>
         </View>
         <Game setNewWord={getNewWord} word={getNewWord().split("")} />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.black,
      alignItems: "center",
      paddingTop: Platform.OS === "android" ? 40 : 0,
   },
   title: {
      color: colors.lightgrey,
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 5,
   },
});
