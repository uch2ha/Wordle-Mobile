import { StatusBar } from "expo-status-bar";
import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   FlatList,
   ScrollView,
} from "react-native";
import { colors, CLEAR, ENTER } from "./src/tools";
import Keyboard from "./src/components/Keyboard/Keyboard";
import { useState } from "react";

const number_of_tries = 6;

export default function App() {
   const word = "hello";
   const letters = word.split("");

   const [rows, setRows] = useState(
      new Array(number_of_tries).fill(new Array(letters.length).fill(""))
   );
   const [currentRow, setCurrentRow] = useState(0);
   const [currentColumn, setCurrentColumn] = useState(0);

   const copyArray = (arr) => {
      return [...arr.map((rows) => [...rows])];
   };

   const onKeyPressed = (key) => {
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

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="light" />
         <View>
            <Text style={styles.title}>WORDLE</Text>
         </View>
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
         <View>
            <Keyboard onKeyPressed={onKeyPressed} />
         </View>
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
   map: {
      marginVertical: 15,
      alignSelf: "stretch",
      height: 100,
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
});
