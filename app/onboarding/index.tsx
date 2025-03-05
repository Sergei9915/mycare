import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useRouter } from 'expo-router';
import { ONBOARDING } from '@/data/onboarding';
import Dots from '@/components/Dots';
import Slide from '@/components/Slide';
import Button from '@/components/Button';

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
          <Slide
            key={item.id}
            title={item.title}
            text={item.text}
            img={item.img}
          />
        ))}
      </PagerView>

      <Dots currentIndex={currentIndex} total={ONBOARDING.length} />

      <Button
        title={currentIndex === 3 ? 'Почати' : 'Продовжити'}
        onPress={handleContinue}
      />
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
});
