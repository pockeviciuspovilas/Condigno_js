import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Image,
  StyleSheet,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { Audio } from "expo-av";
import audios from "../misc/audios";
import oneImage from "../misc/images/one.png";
import twoImage from "../misc/images/two.png";
import threeImage from "../misc/images/three.png";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  boxTopAligned: {
    position: "absolute",
    top: -200,
  },
  boxBottomAligned: {
    position: "absolute",
    bottom: 0,
    alignItems: "stretch",
  },
  containerLeftAligned: {
    position: "absolute",
    left: -50,
  },
  boxLeftAligned: {
    transform: [{ rotate: "90deg" }],
  },
  boxRightAligned: {
    transform: [{ rotate: "90deg" }],
  },
  containerRightAligned: {
    position: "absolute",
    right: -50,
  },
});
const MIN_AUDIO = 0.05;
const MAX_AUDIO = 0.2;
class Swipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: "I'm ready to get swiped!",
      gestureName: "none",
      backgroundColor: "#fff",
      storyList: [],
      oneList: [],
      twoList: [],
      threeList: [],
      storyListIndex: 2,
      oneArrIndex: 0,
      twoArrIndex: 0,
      threeArrIndex: 0,
      questionsCount: 0,
      lastAudioType: null,
      lastAudioPointSize: 0,
      lastAudioIndex: 0,
      isSoundPlaying: false,
      isTutorial: true,
      isInitialStory: false,
      isAmbientLoaded: false,
      isQuestionPlaying: false,
    };
  }

  addAudioToArray() {
    let arr = [];
    arr = [];
    for (let i = 1; i <= 100; i++) {
      arr.push(i);
    }
    this.setState({ oneList: arr.sort(() => Math.random() - 0.5) });

    //2
    arr = [];
    for (let i = 1; i <= 100; i++) {
      arr.push(i);
    }
    this.setState({ twoList: arr.sort(() => Math.random() - 0.5) });

    //3
    arr = [];
    for (let i = 1; i <= 100; i++) {
      arr.push(i);
    }
    this.setState({ threeList: arr.sort(() => Math.random() - 0.5) });

    let storyList = () => {
      let arr = [];
      for (let i = 1; i <= 8; i++) {
        arr.push(i);
      }
      return arr;
    };
    this.setState({ storyList: storyList });
  }
  soundObject = new Audio.Sound();
  ambientSound = new Audio.Sound();
  tickingSound = new Audio.Sound();

  async playTicking() {
    await this.tickingSound.loadAsync(audios.clock.audio);
    this.ambientSound.setVolumeAsync(MIN_AUDIO);
    this.tickingSound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish === true) {
        this.ambientSound.setVolumeAsync(MAX_AUDIO);
        this.setState({ isQuestionPlaying: false });
        await this.tickingSound.unloadAsync();
      } else {
        return;
      }
    });
    setTimeout(() => {
      Vibration.vibrate(3000);
    }, 12000);
    await this.tickingSound.playAsync();
  }

  async onLongPress() {
    if (this.state.isQuestionPlaying === false) {
      this.setState({ myText: "hold" });

      Vibration.vibrate(80);
      await this.soundObject.unloadAsync();
      if (this.state.lastAudioType === "question") {
        if (this.state.lastAudioPointSize === 1) {
          await this.soundObject.loadAsync(
            audios.onePoint[[this.state.oneList[this.state.lastAudioIndex]]]
              .audio
          );
          this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish === true) {
              this.setState({ isSoundPlaying: false });
              this.setState({ isQuestionPlaying: false });
              this.ambientSound.setVolumeAsync(MAX_AUDIO);
              await this.soundObject.unloadAsync();
            } else {
              return;
            }
          });
          await this.soundObject.playAsync();
          this.ambientSound.setVolumeAsync(MIN_AUDIO);
          this.setState({ isSoundPlaying: true });
        } else if (this.state.lastAudioPointSize === 2) {
          await this.soundObject.loadAsync(
            audios.twoPoint[[this.state.twoList[this.state.lastAudioIndex]]]
              .audio
          );
          this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish === true) {
              this.setState({ isSoundPlaying: false });

              this.ambientSound.setVolumeAsync(MAX_AUDIO);
              this.playTicking();
              await this.soundObject.unloadAsync();
            } else {
              return;
            }
          });
          await this.soundObject.playAsync();
          this.ambientSound.setVolumeAsync(MIN_AUDIO);
          this.setState({ isSoundPlaying: true });
        } else if (this.state.lastAudioPointSize === 3) {
          await this.soundObject.loadAsync(
            audios.threePoint[[this.state.threeList[this.state.lastAudioIndex]]]
              .audio
          );
          this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
            if (status.didJustFinish === true) {
              this.setState({ isSoundPlaying: false });
              this.setState({ isQuestionPlaying: false });
              this.ambientSound.setVolumeAsync(MAX_AUDIO);
              await this.soundObject.unloadAsync();
            } else {
              return;
            }
          });
          await this.soundObject.playAsync();
          this.ambientSound.setVolumeAsync(MIN_AUDIO);
          this.setState({ isSoundPlaying: true });
          this.setState({ isQuestionPlaying: true });
        }
      }
    }
  }
  async onSwipeDown() {
    if (this.state.isQuestionPlaying === false) {
      this.setState({ myText: "down" });
      let index = this.state.twoArrIndex;
      this.ambientSound.setVolumeAsync(MIN_AUDIO);
      await this.soundObject.unloadAsync();
      await this.soundObject.loadAsync(
        audios.twoPoint[this.state.twoList[index]].audio
      );
      this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          this.ambientSound.setVolumeAsync(MAX_AUDIO);
          this.setState({ isSoundPlaying: false });

          this.playTicking();
          await this.soundObject.unloadAsync();
        } else {
          return;
        }
      });
      await this.soundObject.playAsync();
      this.setState({ isSoundPlaying: true });
      this.setState({ isQuestionPlaying: true });
      this.setState({ twoArrIndex: index + 1 });
      this.setState({ questionsCount: this.state.questionsCount + 1 });
      this.setState({ lastAudioType: "question" });
      this.setState({ lastAudioPointSize: 2 });
      this.setState({ lastAudioIndex: index });
    }
  }
  async PlayInitial() {
    await this.soundObject.unloadAsync();
    this.ambientSound.setVolumeAsync(MIN_AUDIO);
    await this.soundObject.loadAsync(audios.story[0].audio);
    await this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish === true) {
        this.ambientSound.setVolumeAsync(MAX_AUDIO);
        this.setState({ isSoundPlaying: false });
        this.soundObject.unloadAsync();
      } else {
        return;
      }
    });
    this.setState({ isSoundPlaying: true });
    await this.soundObject.playAsync();
  }

  async PlayAmbient() {
    await this.ambientSound.unloadAsync();
    await this.ambientSound.loadAsync(audios.ambient.audio);
    await this.ambientSound.setVolumeAsync(MIN_AUDIO);
    await this.ambientSound.setIsLoopingAsync(true);
    await this.ambientSound.playAsync();
    this.setState({ isAmbientLoaded: true });
  }

  onSwipeUpCompleteTutorial() {
    this.soundObject.unloadAsync();
    this.setState({ isTutorial: false });
    this.setState({ isInitialStory: true });
    this.ambientSound.setVolumeAsync(MAX_AUDIO);
    this.PlayInitial();
    this.setState({ isSoundPlaying: false });
  }

  async onSwipeUpStartGame() {
    this.soundObject.unloadAsync();
    this.setState({ isTutorial: false });
    this.setState({ isInitialStory: false });

    console.log("start");

    this.setState({ myText: "story" });
    this.ambientSound.setVolumeAsync(MIN_AUDIO);
    await this.soundObject.unloadAsync();
    await this.soundObject.loadAsync(audios.story[1].audio);

    this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish === true) {
        this.ambientSound.setVolumeAsync(MAX_AUDIO);
        this.setState({ isSoundPlaying: false });
        this.setState({ isQuestionPlaying: false });
        await this.soundObject.unloadAsync();
      }
    });
    await this.soundObject.playAsync();
    this.setState({ isSoundPlaying: true });
    this.setState({ isQuestionPlaying: true });
  }

  async onSwipeUpPlayStory() {
    if (this.state.isQuestionPlaying === false) {
      this.setState({ myText: "story" });
      this.ambientSound.setVolumeAsync(MIN_AUDIO);
      let index = this.state.storyListIndex;
      await this.soundObject.unloadAsync();
      await this.soundObject.loadAsync(audios.story[index].audio);

      this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          this.ambientSound.setVolumeAsync(MAX_AUDIO);
          this.setState({ isSoundPlaying: false });
          this.setState({ isQuestionPlaying: false });
          await this.soundObject.unloadAsync();
        }
      });
      await this.soundObject.playAsync();
      this.setState({ isSoundPlaying: true });
      this.setState({ isQuestionPlaying: true });
      this.setState({ storyListIndex: index + 1 });
    }
  }

  async onSwipeLeft() {
    if (this.state.isQuestionPlaying === false) {
      this.setState({ myText: "left" });
      this.ambientSound.setVolumeAsync(MIN_AUDIO);
      let index = this.state.threeArrIndex;

      await this.soundObject.unloadAsync();
      await this.soundObject.loadAsync(
        audios.threePoint[this.state.threeList[index]].audio
      );

      this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          this.setState({ isSoundPlaying: false });
          this.setState({ isQuestionPlaying: false });
          this.ambientSound.setVolumeAsync(MAX_AUDIO);
          await this.soundObject.unloadAsync();
        }
      });
      await this.soundObject.playAsync();
      this.setState({ isSoundPlaying: true });
      this.setState({ isQuestionPlaying: true });
      this.setState({ threeArrIndex: index + 1 });
      this.setState({ questionsCount: this.state.questionsCount + 1 });
      this.setState({ lastAudioType: "question" });
      this.setState({ lastAudioPointSize: 3 });
      this.setState({ lastAudioIndex: index });
    }
  }

  async onSwipeRight() {
    if (this.state.isQuestionPlaying === false) {
      this.setState({ myText: "right" });
      this.ambientSound.setVolumeAsync(MIN_AUDIO);
      let index = this.state.oneArrIndex;
      await this.soundObject.unloadAsync();
      await this.soundObject.loadAsync(
        audios.onePoint[this.state.oneList[index]].audio
      );
      this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          this.setState({ isSoundPlaying: false });
          this.setState({ isQuestionPlaying: false });
          this.ambientSound.setVolumeAsync(MAX_AUDIO);
          await this.soundObject.unloadAsync();
        } else {
          return;
        }
      });
      await this.soundObject.playAsync();
      this.setState({ isSoundPlaying: true });
      this.setState({ isQuestionPlaying: true });
      this.setState({ oneArrIndex: index + 1 });
      this.setState({ questionsCount: this.state.questionsCount + 1 });
      this.setState({ lastAudioType: "question" });
      this.setState({ lastAudioPointSize: 1 });
      this.setState({ lastAudioIndex: index });
    }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: "red" });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: "blue" });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: "yellow" });
        break;
    }
  }

  async componentDidMount() {
    console.log("??");
    if (this.state.isAmbientLoaded === false) {
      this.PlayAmbient();
    }

    if (this.state.isTutorial) {
      await this.soundObject.unloadAsync();

      await this.soundObject.loadAsync(audios.rules.audio);
      await this.soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish === true) {
          this.setState({ isSoundPlaying: false });
          this.setState({ isTutorial: false });
          this.setState({ isInitialStory: true });
          this.soundObject.unloadAsync();
        } else {
          return;
        }
      });
      this.setState({ isSoundPlaying: true });
      await this.soundObject.playAsync();
    }
    this.addAudioToArray();
  }

  render() {
    const config = {
      velocityThreshold: 0.6,
      directionalOffsetThreshold: 100,
    };

    if (this.state.isTutorial) {
      return (
        <GestureRecognizer
          onSwipeUp={() => this.onSwipeUpCompleteTutorial()}
          config={config}
          style={{
            color: this.state.backgroundColor,
            width: "100%",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              fontSize: 45,
              top: 15,
            }}
          >
            Taisyklės
          </Text>

          {this.state.isSoundPlaying && (
            <Image
              source={require("../misc/images/audio.png")}
              style={{
                width: 150,
                height: 150,
                position: "absolute",
                alignSelf: "center",
              }}
            ></Image>
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onLongPress={() => this.onLongPress()}
            delayLongPress={500}
          ></TouchableOpacity>
        </GestureRecognizer>
      );
    } else if (this.state.isInitialStory) {
      return (
        <GestureRecognizer
          onSwipeUp={() => this.onSwipeUpStartGame()}
          config={config}
          style={{
            color: this.state.backgroundColor,
            width: "100%",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {this.state.isSoundPlaying && (
            <Image
              source={require("../misc/images/audio.png")}
              style={{
                width: 150,
                height: 150,
                position: "absolute",
                alignSelf: "center",
              }}
            ></Image>
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onLongPress={() => this.onLongPress()}
            delayLongPress={500}
          ></TouchableOpacity>
        </GestureRecognizer>
      );
    } else {
      return (
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeLeft={() => this.onSwipeLeft()}
          onSwipeRight={() => this.onSwipeRight()}
          onSwipeDown={() => this.onSwipeDown()}
          onSwipeUp={() => this.onSwipeUpPlayStory()}
          config={config}
          style={{
            color: this.state.backgroundColor,
            width: "100%",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {this.state.isSoundPlaying && (
            <Image
              source={require("../misc/images/audio.png")}
              style={{
                width: 150,
                height: 150,
                position: "absolute",
                alignSelf: "center",
              }}
            ></Image>
          )}
          <View>
            <View style={[[styles.container, styles.containerLeftAligned]]}>
              <View style={[styles.boxLeftAligned]}>
                <Image
                  source={oneImage}
                  style={{
                    height: 90,
                    width: 170,
                  }}
                />
              </View>
            </View>
            <View style={[styles.container]}>
              <View style={[styles.boxTopAligned]}>
                <Image
                  source={twoImage}
                  style={{
                    height: 90,
                    width: 250,
                  }}
                />
              </View>
            </View>
            <View style={[[styles.container, styles.containerRightAligned]]}>
              <View style={[styles.boxRightAligned]}>
                <Image
                  source={threeImage}
                  style={{
                    height: 90,
                    width: 170,
                  }}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onLongPress={() => this.onLongPress()}
            delayLongPress={500}
          ></TouchableOpacity>
        </GestureRecognizer>
      );
    }
  }
}

export default Swipper;
