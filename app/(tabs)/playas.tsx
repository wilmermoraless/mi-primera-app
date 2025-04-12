import {Image, StyleSheet, Platform, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Gallery from 'react-native-awesome-gallery';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState, useEffect} from "react";

const images = [
  'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  'https://image2',
];

export default function HomeScreen() {
    const [usuario, setUsuario] = useState('');

    // Get data from AsyncStorage; declare a variable to store the data if not exist
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if(value !== null) {
                setUsuario(value);
            }
        } catch(e) {
            console.log("Error:" + e);
        }
    }


    // Store data in AsyncStorage; declare a variable to store the data if not exist
    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('user', value);
        } catch (e) {
            // saving error
        }
    }

    const handleInputChange = async (text: string) => {
        setUsuario(text);
        await storeData(text);
    }

    //Using useEffect to get the data from AsyncStorage when the component mounts
    useEffect(() => {
        (async() => {
            await getData();
        })()
    }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/beach.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Visita las playas de Nicaragua!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{usuario}</ThemedText>
        <TextInput value={usuario} style={styles.textInput} onChangeText={handleInputChange}  />
      </ThemedView>
      <Gallery
        data={images}
        onIndexChange={(newIndex) => {
          console.log(newIndex);
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        width: '100%',
    }
});