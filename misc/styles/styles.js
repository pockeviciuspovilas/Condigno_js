import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    borderRadius: 5,
    padding: 25,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "green",
    alignSelf: "center",
  },
  boxTopAligned: {
    position: "absolute",
    top: -10,
    alignItems: "stretch",
  },
  boxBottomAligned: {
    position: "absolute",
    bottom: 0,
    alignItems: "stretch",
  },
  containerLeftAligned: {
    position: "absolute",
    left: -50,
    top: "50%",
    alignItems: "stretch",
  },
  boxLeftAligned: {
    textAlign: "center",
    left: 0,
    transform: [{ rotate: "90deg" }],
  },
  boxRightAligned: {
    textAlign: "center",
    right: -50,
    transform: [{ rotate: "90deg" }],
  },
  containerRightAligned: {
    position: "absolute",
    right: 0,
    top: "50%",
    alignItems: "stretch",
  },
});
