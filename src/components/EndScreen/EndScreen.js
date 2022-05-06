import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import { colors } from "../../tools";
import Animated, { SlideInUp, ZoomIn } from "react-native-reanimated";

const EndScreen = ({ won, resetGame, word }) => {
   return (
      <Animated.View
         entering={won ? SlideInUp.springify().delay(300) : ZoomIn.delay(300)}
         style={styles.container}
      >
         <Text style={styles.title}>
            {won ? "Congratulations!" : "Nice try!\n Good Luck next time"}
         </Text>
         <Text style={styles.subtitle}>
            The word was "{word.join("").toUpperCase()}"
         </Text>
         <Animated.View
            entering={won ? ZoomIn.delay(1500) : ZoomIn.delay(1000)}
         >
            <Button onPress={() => resetGame()} title="RESTART" color="blue" />
         </Animated.View>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginVertical: 250,
   },
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
});

export default EndScreen;
