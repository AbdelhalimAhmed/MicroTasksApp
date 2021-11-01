import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';

import { Text, View } from '../components/Themed';

export default function MicroTaskDetailsScreen() {
  return (
    <View style={styles.container}>
      <Carousel
        renderCarouselItem={(item, index) => {
          return (
            <View>
              <Text>{index}</Text>
            </View>
          )
        }}
        data={
        {
          tasks: [
            {
              id: 1,
              title: 'test title for video',
              desc: 'some description about test video card',
              type: 'video',
            },
            {
              id: 2,
              title: 'test title for news',
              desc: 'some description about test news card',
              type: 'news' 
            },
            {
              id: 3,
              title: 'test title for image',
              desc: 'some description about test image card',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
