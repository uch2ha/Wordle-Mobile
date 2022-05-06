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
      const wordList = CUSTOM_DATA[Math.floor(Math.random() * 5 + 3)]; // from 3 to 8 word's length
      let new_word = wordList[Math.floor(Math.random() * wordList.length)];
      console.log(new_word);
      return new_word;
   };

   const getNumberOfRows = (word) => {
      return word.length < 7
         ? word.length + 2
         : word.length + Math.floor(word.length / 2);
   };

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         <View>
            <Text style={styles.title}>WORDLE</Text>
         </View>
         <Game
            getNewWord={getNewWord}
            getNumberOfRows={getNumberOfRows}
            word={getNewWord().split("")}
         />
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
