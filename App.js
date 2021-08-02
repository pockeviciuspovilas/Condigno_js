import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, View } from "react-native";
import Swipper from "./components/Swipper";
export default function App() {
  return (
    setStatusBarHidden(true),
    (
      <ImageBackground
        source={require("./misc/images/background.jpg")}
        style={{ width: null, height: null }}
      >
        <StatusBar style="light" />
        <View>
          <Swipper />
        </View>
      </ImageBackground>
    )
  );
}
