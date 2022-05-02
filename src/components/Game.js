import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard/Keyboard";
import { colors, CLEAR, ENTER } from "../tools";

const number_of_tries = 6;

export default function Game() {
   const word = "hello";
   const letters = word.split("");

   const [rows, setRows] = useState(
      new Array(number_of_tries).fill(new Array(letters.length).fill(""))
   );
   const [currentRow, setCurrentRow] = useState(0);
   const [currentColumn, setCurrentColumn] = useState(0);
   const [gameState, setGameState] = useState("playing"); //win, lose, playing

   useEffect(() => {
      if (currentRow > 0) {
         checkGameState();
      }
   }, [currentRow]);

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

   return (
      <View>
         <ScrollView style={styles.map}>
            {rows.map((row, i) => (
               <View key={`row-${i}`} style={styles.row}>
                  {row.map((letter, j) => (
                     <View
                        key={`cell-${i}-${j}`}
                        style={[
                           styles.cell,
                           {
                              borderColor: isCellActive(i, j)
                                 ? colors.lightgrey
                                 : colors.darkgrey,
                              backgroundColor: getCellBGcolor(i, j),
                           },
                        ]}
                     >
                        <Text style={styles.cellText}>
                           {letter.toUpperCase()}
                        </Text>
                     </View>
                  ))}
               </View>
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

const styles = StyleSheet.create({
   map: {
      marginVertical: 15,
      alignSelf: "stretch",
   },
   row: {
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center",
   },
   cell: {
      flex: 1,
      aspectRatio: 1,
      borderWidth: 3,
      borderColor: colors.darkgrey,
      margin: 3,
      maxWidth: 70,
      justifyContent: "center",
      alignItems: "center",
   },

   cellText: {
      color: colors.lightgrey,
      fontWeight: "bold",
      fontSize: 28,
   },
   keyboard: {
      paddingBottom: 65,
   },
});
