import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { DUMMY_IMAGE } from '../constants/DummyData';
import { RootTabScreenProps } from '../types';

/* TODO-LIST:
   1. [x] create home screen and navigation (0.30)
   2. [x] create micro task card (0.30)
   3. [x] create micro task detail screen (0.30)
   4. [x] create carousel including content of tasks (1.30)
   5. [x] integrate recoding package (0.30)
   6. [x] record audio and caching it (0.30)
   7. [x] integrate context API to manage state to handle progress of micro task (1.30)
   8. [x] handle progress (0.30)
   9. [ ] handle recorder audios // sorry i didn't handle it, cause my time is over to do the task, we could discuss it on Next Meeting
*/

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
   const {navigate} = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Micro Tasks:</Text>
      <Pressable onPress={() => navigate('MicroTaskDetails')} style={styles.card}>
        <Image style={styles.image} source={{uri: DUMMY_IMAGE}} />
        <View style={styles.details}>
          <Text style={styles.title}>Taking Care of your personal mindset</Text>
          <Text style={styles.desc}>Learn more about mindset</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9faff'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: 'white'
  },
  image: {
    width: 60,
    height: 60
  },
  details: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  desc: {
    fontSize: 12,
    color: 'silver',
  }
});
