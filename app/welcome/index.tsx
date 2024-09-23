import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/images/backgrounds/bg5.png')}
      >
        <Image
          style={styles.logoWelcome}
          resizeMode="contain"
          source={require('../../assets/images/logoWelcome.png')}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace('/login')}
          >
            <Text style={styles.loginText}>Вхід</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.replace('/sign-up')}
          >
            <Text style={styles.registerText}>Реєстрація</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: width,
    height: height * 0.6,
    resizeMode: 'cover',
  },
  buttonsContainer: {
    marginTop: 70,
    paddingBottom: 70,
    alignItems: 'center',
  },
  logoWelcome: {
    width: 130,
    height: 173,
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: [{ translateX: -65 }],
    zIndex: 1,
  },
  loginButton: {
    width: width * 0.9,
    backgroundColor: '#40744D',
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
  registerButton: {
    width: width * 0.9,
    borderColor: '#40744D',
    borderWidth: 1.3,
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#40744D',
    fontSize: 18,
  },
});
