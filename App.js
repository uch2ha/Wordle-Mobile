import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { colors } from "./src/tools";
import { useState, useEffect } from "react";
import Game from "./src/components/Game/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CUSTOM_DATA = require("./src/data/english_words.json");

export default function App() {
   const [winsHistoryData, setWinsHistoryData] = useState([]);

   useEffect(() => {
      readWinsHistory();
   }, []);

   const readWinsHistory = async () => {
      const dataString = await AsyncStorage.getItem("@winsHistory");
      // read stash of @winsHistory
      try {
         const data = JSON.parse(dataString);
         setWinsHistoryData(data !== null ? data : []);
      } catch (e) {
         console.log("Error then read wins history", e);
      }
   };
   // take full wordList from JSON file and take wordList @winsHistory from AsyncStorage and merge them
   // remove all words that have been guessed
   const getMergedDict = (winsList) => {
      const allWordDict = CUSTOM_DATA;

      let all_word_arr = Object.values(allWordDict).join(",").split(",");
      let mergedDict = { 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };

      all_word_arr.forEach((w) => {
         if (!winsList.includes(w)) {
            mergedDict[w.length].push(w);
         }
      });

      return mergedDict;
   };

   const getNewWord = (winsList) => {
      const mergedDict = getMergedDict(winsList);

      const wordList = mergedDict[Math.floor(Math.random() * 5 + 3)]; // choose random word length from 3 to 8 word's length
      let new_word = wordList[Math.floor(Math.random() * wordList.length)]; // choose random word

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
            splitedWord={getNewWord(winsHistoryData).split("")}
            allWordDict={(allWordDict = CUSTOM_DATA)}
            getMergedDict={getMergedDict}
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
