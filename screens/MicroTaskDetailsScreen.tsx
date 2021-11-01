import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';
import { Video } from 'expo-av';

import { Text, View } from '../components/Themed';
import { DUMMY_IMAGE } from '../constants/DummyData';

export default function MicroTaskDetailsScreen() {
  const video = React.useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
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
              return <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.desc}</Text>
              </View>
            default:
              return <></>
          }
        }}
        data={
        {
          tasks: [
            {
              id: 1,
              title: 'test title for news',
              desc: 'some description about test news card',
              type: 'news' 
            },
            {
              id: 2,
              title: 'test title for video',
              desc: 'some description about test video card',
              videoURL: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              type: 'video',
            },
            {
              id: 3,
              title: 'test title for image',
              desc: 'some description about test image card',
              imageURL: DUMMY_IMAGE,
              type: 'image'
            },
          ],
          progress: 0,
          id: 1,
          title: 'Task 1'
        }
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
