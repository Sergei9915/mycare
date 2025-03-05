import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '@/config/firebase';
import Avatar from '@/components/Avatar';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import Smiles from '@/components/Smiles';
import { router } from 'expo-router';
import { ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');
export default function Home() {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Avatar uri="https://images.prom.ua/270282653_vafelna-kartinka-dlya.jpg" />
          <View style={styles.textContainer}>
            <Text style={styles.username}>Привіт, {displayName}!</Text>
            <Text style={styles.greeting}>Добрий ранок!</Text>
          </View>
          <SimpleLineIcons name="settings" size={30} color="black" />
        </View>
        <Smiles />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 16,
          }}
        >
          <View>
            <Text style={styles.sectionTitle}>Пройти денне опитування</Text>
            <Text style={{ fontSize: 10, color: '#575757' }}>
              Це допоможе нам краще аналізувати твою шкіру
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <AntDesign
              name="right"
              size={20}
              color="#40744D"
              style={{ fontWeight: 'bold' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitleOne}>Найкращі поради</Text>
          <Image
            source={require('../../assets/images/advices.png')}
            style={styles.imageSmall}
          />
        </View>
        <View style={styles.calendarSection}>
          <ImageBackground
            style={{ width: 383, height: 80 }}
            source={require('../../assets/images/testBG.png')}
          >
            <Text style={styles.sectionTitleTwo}></Text>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 16,
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontFamily: 'NotoSansBold' }}>
              Закінчується термін придатності
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <AntDesign
              name="right"
              size={20}
              color="black"
              style={{ fontWeight: 'bold' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Додати косметику</Text>
          </TouchableOpacity>
          <Image source={{ uri: 'image_url_4' }} style={styles.imageLarge} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitleOne: {
    fontSize: 16,
    fontFamily: 'NotoSansBold',
    lineHeight: 24,
  },
  sectionTitleTwo: { fontSize: 13 },
  sectionTitleThree: {},
  sectionTitleFoo: {},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  textContainer: {
    right: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 27,
    lineHeight: 37,
    fontFamily: 'NotoSansBold',
  },
  username: {
    fontSize: 18,
    lineHeight: 25,
    color: '#575757',
    fontFamily: 'NotoSansRegular',
  },
  skinStatus: {
    backgroundColor: '#E0FFE6',
    borderRadius: 12,
    margin: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'NotoSansRegular',
    color: '#40744D',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#888',
  },
  backButton: {},
  imageSmall: {
    width: 350,
    height: 200,
    marginTop: 8,
  },
  imageLarge: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 8,
  },

  calendarSection: {
    backgroundColor: '#FFEBE6',
    borderRadius: 12,
    marginBottom: 16,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  loginButton: {
    width: width * 0.9,
    backgroundColor: '#40744D',
    paddingVertical: 30,
    borderRadius: 15,
    alignItems: 'flex-start',
    marginBottom: 15,
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
