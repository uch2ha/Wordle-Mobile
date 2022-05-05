import { StyleSheet } from "react-native";
import { colors } from "../../tools";

export default StyleSheet.create({
   map: {
      marginVertical: 10,
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
      paddingBottom: 50,
   },
});
