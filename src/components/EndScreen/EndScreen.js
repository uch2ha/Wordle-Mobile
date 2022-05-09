import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import { colors } from "../../tools";
import Animated, { SlideInUp, ZoomIn } from "react-native-reanimated";

const EndScreen = ({ won, resetGame, word, allWordDict, mergedDict }) => {
   return (
      <Animated.View
         entering={won ? SlideInUp.springify().delay(300) : ZoomIn.delay(300)}
         style={{ marginVertical: won ? 175 : 250 }}
      >
         <Text style={styles.title}>
            {won ? "Congratulations!" : "Nice try!\n Good Luck next time"}
         </Text>
         <Text style={styles.subtitle}>
            The word was "{word.join("").toUpperCase()}"
         </Text>
         {won ? (
            <>
               <Text style={styles.statisticsTitle}>
                  How many words were guessed by the length of the word
               </Text>
               <View style={styles.statisticsView}>
                  <Text style={styles.statisticsRow}>
                     3: {allWordDict[3].length - mergedDict[3].length} /{" "}
                     {allWordDict[3].length}
                  </Text>
                  <Text style={styles.statisticsRow}>
                     4: {allWordDict[4].length - mergedDict[4].length} /{" "}
                     {allWordDict[4].length}
                  </Text>
                  <Text style={styles.statisticsRow}>
                     5: {allWordDict[5].length - mergedDict[5].length} /{" "}
                     {allWordDict[5].length}
                  </Text>
                  <Text style={styles.statisticsRow}>
                     6: {allWordDict[6].length - mergedDict[6].length} /{" "}
                     {allWordDict[6].length}
                  </Text>
                  <Text style={styles.statisticsRow}>
                     7: {allWordDict[7].length - mergedDict[7].length} /{" "}
                     {allWordDict[7].length}
                  </Text>
                  <Text style={styles.statisticsRow}>
                     8: {allWordDict[8].length - mergedDict[8].length} /{" "}
                     {allWordDict[8].length}
                  </Text>
               </View>
            </>
         ) : (
            <></>
         )}
         <Animated.View
            entering={won ? ZoomIn.delay(1500) : ZoomIn.delay(1000)}
         >
            <Button onPress={() => resetGame()} title="RESTART" color="blue" />
         </Animated.View>
      </Animated.View>
   );
};
const styles = StyleSheet.create({
   title: {
      fontSize: 30,
      color: "white",
      textAlign: "center",
      marginVertical: 0,
      fontWeight: "bold",
   },
   subtitle: {
      fontSize: 20,
      color: colors.lightgrey,
      textAlign: "center",
      marginVertical: 30,
   },
   statisticsTitle: {
      fontSize: 20,
      color: colors.lightgrey,
      textAlign: "center",
      marginVertical: 5,
      marginHorizontal: 5,
   },
   statisticsView: {
      alignSelf: "center",
      marginBottom: 30,
   },
   statisticsRow: {
      textAlign: "left",
      marginVertical: 5,
      fontSize: 20,
      color: colors.lightgrey,
   },
});

export default EndScreen;
