import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, View } from "react-native";
import Swipper from "./components/Swipper";
import { TextInput, Button } from "react-native";
export default function App() {
  const [code, onChangeCode] = React.useState(null);
  const [clicked, onSetClick] = React.useState(false);
  if (clicked) {
    return (
      setStatusBarHidden(true),
      (
        <ImageBackground
          source={require("./misc/images/background.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <StatusBar style="light" />
          <View>
            <Swipper></Swipper>
          </View>
        </ImageBackground>
      )
    );
  } else {
    return (
      setStatusBarHidden(true),
      (
        <ImageBackground
          source={require("./misc/images/background.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <StatusBar style="light" />
          <View justifyContent="center" flex="1" alignItems="center">
            <TextInput
              style={{
                height: 40,
                width: 200,
                fontSize: 25,
              }}
              placeholder="Įveskite kodą"
              placeholderTextColor="black"
              maxLength={8}
              autoCapitalize="characters"
              textAlign="center"
              onChangeText={onChangeCode}
            />
            <Button
              title="Aktyvuoti"
              onPress={() => {
                if (code.includes("DEV")) {
                  console.log(code);
                  onSetClick(true);
                } else {
                  alert("Šis kodas yra aktyvuotas arba neegzistuojantis");
                  onSetClick(false);
                }
              }}
            />
          </View>
        </ImageBackground>
      )
    );
  }
}
