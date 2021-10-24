import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { Button, Image } from 'native-base';

export default function RecipesScreen() {
  const [image, setImage] = React.useState(null);


  const pickImage = async () => {
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    setImage(null);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={takeImage}>
        Take an image from your camera
      </Button>
      <Button onPress={pickImage}>
        Pick an image from camera roll
      </Button>
      {image && <Image alt="Something" source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
