import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import { colors } from "../../tools";

const StatNumber = ({ number, label }) => (
   <View style={styles.statNumberCell}>
      <Text style={styles.statNumberText}>{number}</Text>
      <Text style={styles.statLabelText}>{label}</Text>
   </View>
);

const EndScreen = ({ won, resetGame }) => {
   return (
      <View>
         <Text style={styles.title}>
            {won ? "Congratulations!" : "Nice try!\n Good Luck next time"}
         </Text>
         <View>
            <Button
               onPress={() => resetGame()}
               title="RESTART"
               color="#841584"
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
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
   statNumbersContainer: {
      flexDirection: "row",
      marginBottom: 20,
   },
   statNumberCell: {
      alignItems: "center",
      margin: 10,
   },
   statNumberText: {
      color: colors.lightgrey,
      fontSize: 30,
      fontWeight: "bold",
   },
   statLabelText: {
      color: colors.lightgrey,
      fontSize: 15,
   },
});

export default EndScreen;
