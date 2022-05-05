import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { colors } from "../../tools";
import Animated, {
   SlideInDown,
   SlideInUp,
   ZoomIn,
} from "react-native-reanimated";

const SetUpScreen = ({ closeSetUp }) => {
   const [numberOfTries, setNumberOfTries] = useState(6);
   return (
      <Animated.View
         entering={SlideInUp.springify().delay(300)}
         style={styles.container}
      >
         <Text style={styles.title}>Congratulations!</Text>
         <TextInput
            // style={hei}
            onChangeText={(value) => setNumberOfTries(value)}
            value={numberOfTries}
            placeholder="useless placeholder"
            keyboardType="numeric"
         />
         <Animated.View entering={ZoomIn.delay(1500)}>
            <Button
               onPress={() => closeSetUp(numberOfTries)}
               title="START"
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
      marginVertical: 15,
   },
   subtitle: {
      fontSize: 20,
      color: colors.lightgrey,
      textAlign: "center",
      marginVertical: 10,
      fontWeight: "bold",
   },
});

export default SetUpScreen;
