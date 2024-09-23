import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useRouter } from 'expo-router';
import { ONBOARDING } from '@/data/onboarding';
import Dots from '@/components/dots';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleContinue = () => {
    if (currentIndex < ONBOARDING.length - 1) {
      pagerRef.current?.setPage(currentIndex + 1);
    } else {
      router.replace('/welcome');
    }
  };

  const onPageSelected = (event: any) => {
    console.log(event.nativeEvent.position);
    setCurrentIndex(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {ONBOARDING.map(item => (
          <View key={item.id}>
            <ImageBackground
              source={item.img}
              style={styles.image}
              resizeMode="cover"
            >
              <View style={styles.contentContainer}>
                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>
                <Text numberOfLines={2} style={styles.text}>
                  {item.text}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </PagerView>

      <Dots currentIndex={currentIndex} total={ONBOARDING.length} />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>
          {currentIndex === 3 ? 'Почати' : 'Продовжити'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: width,
    height: height * 0.55,
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    top: '95%',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 27,
    lineHeight: 37,
    marginBottom: 16,
    fontFamily: 'NotoSansBold',
    textAlign: 'center',
    width: '60%',
  },
  text: {
    fontSize: 18,
    lineHeight: 25,
    color: '#575757',
    fontFamily: 'NotoSansRegular',
    textAlign: 'center',
  },
  button: {
    marginBottom: 70,
    width: width * 0.9,
    backgroundColor: '#40744D',
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
