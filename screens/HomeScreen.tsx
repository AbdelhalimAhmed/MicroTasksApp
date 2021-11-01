import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

/* TODO-LIST:
   1. [x] create home screen and navigation
   2. [x] create micro task card
   3. [x] create micro task detail screen
   4. [ ] create carousel including content of task
   5. [ ] integrate recoding package
   6. [ ] record audio and caching it
   7. [ ] integrate context API to manage state to handle progress of micro task
*/
export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
   const {navigate} = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Micro Tasks:</Text>
      <Pressable onPress={() => navigate('MicroTaskDetails')} style={styles.card}>
        <Image style={styles.image} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBKB-JqR0acSi8Tc5rj9WS6ExaVSFicKSw7A&usqp=CAU'}} />
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