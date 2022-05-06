import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Keyboard from "../Keyboard/Keyboard";
import { colors, CLEAR, ENTER } from "../../tools";
import styles from "./Game.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EndScreen from "../EndScreen";
import Animated, {
   ZoomIn,
   SlideInLeft,
   SlideInRight,
   FlipInEasyX,
} from "react-native-reanimated";

const NUMBER_Of_TRIES = 7;

export default function Game({ word, getNewWord }) {
   // to clear all storage data
   // AsyncStorage.removeItem("@gameData");

   const [letters, setLetters] = useState(word);
   const [rows, setRows] = useState(
      new Array(NUMBER_Of_TRIES).fill(new Array(letters.length).fill(""))
   );
   const [currentRow, setCurrentRow] = useState(0);
   const [currentColumn, setCurrentColumn] = useState(0);
   const [gameState, setGameState] = useState("playing"); //win, lose, playing
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      readState();
   }, []);

   useEffect(() => {
      if (currentRow > 0) {
         checkGameState();
      }
   }, [currentRow]);

   useEffect(() => {
      if (loaded) {
         saveStateToCash();
      }
   }, [rows, currentRow, currentColumn, gameState]);

   const saveStateToCash = async () => {
      const data = {
         letters,
         rows,
         currentRow,
         currentColumn,
         gameState,
      };

      try {
         const dataString = JSON.stringify(data);
         await AsyncStorage.setItem("@gameData", dataString);
      } catch (e) {
         console.log("Error then saveStateToCash", e);
      }
   };

   const readState = async () => {
      const dataString = await AsyncStorage.getItem("@gameData");
      try {
         const data = JSON.parse(dataString);
         setLetters(data.letters);
         setRows(data.rows);
         setCurrentRow(data.currentRow);
         setCurrentColumn(data.currentColumn);
         setGameState(data.gameState);
      } catch (e) {
         console.log("Error then readState", e);
      }
      setLoaded(true);
   };

   const resetGame = async () => {
      const new_word = getNewWord().split("");

      const data = {
         letters: new_word,
         rows: new Array(NUMBER_Of_TRIES).fill(
            new Array(new_word.length).fill("")
         ),
         currentRow: 0,
         currentColumn: 0,
         gameState: "playing",
      };

      setRows(data.rows);
      setCurrentRow(data.currentRow);
      setCurrentColumn(data.currentColumn);
      setGameState(data.gameState);
      setLetters(new_word);

      try {
         const dataString = JSON.stringify(data);
         await AsyncStorage.setItem("@gameData", dataString);
      } catch (e) {
         console.log("Error then reset game", e);
      }
   };

   const checkGameState = () => {
      if (checkIfWin()) {
         setGameState("win");
      } else if (checkIfLose()) {
         setGameState("lose");
      }
   };

   const checkIfWin = () => {
      const row = rows[currentRow - 1];
      return row.every((letter, i) => letter === letters[i]);
   };

   const checkIfLose = () => {
      return currentRow === rows.length;
   };

   const copyArray = (arr) => {
      return [...arr.map((rows) => [...rows])];
   };

   const onKeyPressed = (key) => {
      if (gameState !== "playing") {
         return;
      }

      const updatedArr = copyArray(rows);

      if (key === CLEAR) {
         const prevCol = currentColumn - 1;
         if (prevCol >= 0) {
            updatedArr[currentRow][prevCol] = "";
            setRows(updatedArr);
            setCurrentColumn(prevCol);
         }
         return;
      }

      if (key === ENTER) {
         if (currentColumn === rows[0].length) {
            setCurrentRow(currentRow + 1);
            setCurrentColumn(0);
         }

         return;
      }

      if (currentColumn < rows[0].length) {
         updatedArr[currentRow][currentColumn] = key;
         setRows(updatedArr);
         setCurrentColumn(currentColumn + 1);
      }
   };

   const isCellActive = (row, col) => {
      return row === currentRow && col === currentColumn;
   };

   const getCellBGcolor = (row, col) => {
      const letter = rows[row][col];

      if (row >= currentRow) {
         return colors.black;
      }

      if (letter === letters[col]) {
         return colors.primary;
      }
      if (letters.includes(letter)) {
         return colors.secondary;
      }
      return colors.darkgrey;
   };

   const getAllLettersWithColor = (color) => {
      return rows.flatMap((row, i) =>
         row.filter((cell, j) => getCellBGcolor(i, j) === color)
      );
   };

   const greenCaps = getAllLettersWithColor(colors.primary);
   const yellowCaps = getAllLettersWithColor(colors.secondary);
   const greyCaps = getAllLettersWithColor(colors.darkgrey);

   const getCellStytle = (i, j) => [
      styles.cell,
      {
         borderColor: isCellActive(i, j) ? colors.lightgrey : colors.darkgrey,
         backgroundColor: getCellBGcolor(i, j),
      },
   ];

   if (!loaded) {
      return <ActivityIndicator />;
   }

   if (gameState !== "playing") {
      return (
         <EndScreen
            won={gameState === "win"}
            resetGame={resetGame}
            word={letters}
         />
      );
   }

   return (
      <View>
         <Text style={{ color: "blue", alignSelf: "center" }}>
            {letters.join("").toUpperCase()}
         </Text>
         <ScrollView style={styles.map}>
            {rows.map((row, i) => (
               <Animated.View
                  entering={
                     i % 2 === 0
                        ? SlideInLeft.delay(i * 50)
                        : SlideInRight.delay(i * 50)
                  }
                  key={`row-${i}`}
                  style={styles.row}
               >
                  {row.map((letter, j) => (
                     <>
                        {i < currentRow && (
                           <Animated.View
                              entering={FlipInEasyX.delay(j * 100)}
                              key={`cell-colored-${i}-${j}`}
                              style={getCellStytle(i, j)}
                           >
                              <Text style={styles.cellText}>
                                 {letter.toUpperCase()}
                              </Text>
                           </Animated.View>
                        )}
                        {i === currentRow && !!letter && (
                           <Animated.View
                              entering={ZoomIn}
                              key={`cell-active-${i}-${j}`}
                              style={getCellStytle(i, j)}
                           >
                              <Text style={styles.cellText}>
                                 {letter.toUpperCase()}
                              </Text>
                           </Animated.View>
                        )}
                        {!letter && (
                           <View
                              key={`cell-${i}-${j}`}
                              style={getCellStytle(i, j)}
                           >
                              <Text style={styles.cellText}>
                                 {letter.toUpperCase()}
                              </Text>
                           </View>
                        )}
                     </>
                  ))}
               </Animated.View>
            ))}
         </ScrollView>
         <View style={styles.keyboard}>
            <Keyboard
               onKeyPressed={onKeyPressed}
               greenCaps={greenCaps}
               yellowCaps={yellowCaps}
               greyCaps={greyCaps}
            />
         </View>
      </View>
   );
}
