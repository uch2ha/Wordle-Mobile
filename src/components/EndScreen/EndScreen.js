import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import { colors } from "../../tools";
import Animated, {
   SlideInDown,
   SlideInUp,
   ZoomIn,
} from "react-native-reanimated";

const StatNumber = ({ number, label }) => (
   <View style={styles.statNumberCell}>
      <Text style={styles.statNumberText}>{number}</Text>
      <Text style={styles.statLabelText}>{label}</Text>
   </View>
);

const EndScreen = ({ won, resetGame, word }) => {
   return (
      <Animated.View
         entering={SlideInUp.springify().delay(300)}
         style={styles.container}
      >
         <Text style={styles.title}>
            {won ? "Congratulations!" : "Nice try!\n Good Luck next time"}
         </Text>
         <Text style={styles.subtitle}>The Word was "{word}"</Text>
         <Animated.View entering={ZoomIn.delay(1500)}>
            <Button
               onPress={() => resetGame()}
               title="RESTART"
               color="#841584"
            />
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
