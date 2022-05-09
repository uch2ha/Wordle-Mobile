import { StyleSheet, View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../tools";
import Animated, { SlideInUp, ZoomIn } from "react-native-reanimated";

import { ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const EndScreen = ({ won, resetGame, word, allWordDict, mergedDict }) => {
   const [data, setData] = useState({ labels: [], data: [] });

   useEffect(() => createDataForChart(), []);

   const createDataForChart = () => {
      const new_labels = Object.keys(allWordDict).map((val) => {
         return val + ":";
      });

      let new_data = [];
      let integerKeys = Object.keys(allWordDict).map((val) => {
         return parseInt(val);
      });

      for (
         let i = integerKeys[0];
         i <= integerKeys[integerKeys.length - 1];
         i++
      ) {
         let procent =
            (allWordDict[i].length - mergedDict[i].length) /
            allWordDict[i].length;
         new_data.push(procent);
      }

      setData({ labels: new_labels.reverse(), data: new_data.reverse() });
   };

   const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(0, 197, 255, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
   };

   return (
      <Animated.View
         entering={won ? SlideInUp.springify().delay(300) : ZoomIn.delay(300)}
         style={{ marginVertical: won ? 175 : 250 }}
      >
         <Text style={styles.title}>
            {won ? "Congratulations!" : "Nice try!\n Good Luck next time"}
         </Text>
         {won ? (
            <></>
         ) : (
            <Text style={styles.subtitle}>
               The word was "{word.join("").toUpperCase()}"
            </Text>
         )}
         {won ? (
            <View style={styles.statisticsView}>
               <Text style={styles.statisticsTitle}>
                  How many words were guessed by the length of the word
               </Text>
               <ProgressChart
                  data={data}
                  width={screenWidth}
                  height={275}
                  strokeWidth={10}
                  radius={32}
                  chartConfig={chartConfig}
                  hideLegend={false}
               />
            </View>
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
   statisticsView: {
      alignSelf: "center",
      marginBottom: 30,
   },
   statisticsTitle: {
      fontSize: 20,
      color: colors.lightgrey,
      textAlign: "center",
      marginVertical: 15,
      marginHorizontal: 5,
   },
});

export default EndScreen;
