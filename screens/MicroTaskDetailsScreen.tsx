import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Button } from 'react-native';
import Carousel from '../components/Carousel';
import { Video, Audio } from 'expo-av';

import { Text, View } from '../components/Themed';
import { Recording } from 'expo-av/build/Audio';
import TasksContext, { TasksContextType } from '../context/tasks';

export default function MicroTaskDetailsScreen() {
  const video = useRef(null);
  const [recordingState, setRecording] = useState<Recording | undefined | null >();
  const [sound, setSound] = React.useState();
  const tasksContext = React.useContext<TasksContextType>(TasksContext);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recordingState?.stopAndUnloadAsync();
    const uri = recordingState?.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }

  const playSound = async () =>  {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      {uri: 'file:///var/mobile/Containers/Data/Application/42DDD0AC-4E05-4773-B179-9FC55DA5155C/Library/Caches/ExponentExperienceData/%2540anonymous%252FSharpistMicroTask-34cee6bd-f01a-41c5-aea9-1808db0185f6/AV/recording-17876E6B-A9AC-4A83-AFA4-DFC203F0A95B.m4a'}
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  const updateProgress = (progress: number) => {
    tasksContext.updateProgress(1, progress)
  }

    return (
    <View style={styles.container}>
      <Carousel
        onVisibleItem={updateProgress}
        renderCarouselItem={(item, index) => {
          switch (item.type) {
            case 'image':
              return <Image resizeMode={'contain'} source={{ uri: item.imageURL }} style={{...StyleSheet.absoluteFillObject}}/>
            case 'video':
              return (
                <>
                  <Video
                    ref={video}
                    style={styles.video}
                    source={{
                      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                </>
              )
            case 'news':
              return (
                <View style={styles.card}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.desc}</Text>
                </View>
              )
            case 'record':
              return (
                <>
                  <Button title="Play your Record" onPress={playSound} />
                  <Button
                    color={recordingState ? 'red' : ''}
                    title={recordingState ? 'Stop Recording' : 'Start Recording'}
                    onPress={recordingState ? stopRecording : startRecording}
                  />
                </>
              )
            default:
              return <></>
          }
        }}
        data={
          tasksContext?.data[0]
      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  video: {
    width: '100%',
    height: 200,
  },
});
