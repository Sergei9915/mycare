import { StyleSheet, View } from 'react-native';
import React from 'react';

export interface DotsProps {
  currentIndex: number;
  total: number;
}

export default function Dots({
  currentIndex,
  total,
}: DotsProps): React.JSX.Element {
  return (
    <View style={styles.dotContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index.toString()}
          style={[styles.dot, { opacity: index === currentIndex ? 1 : 0.1 }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '77%',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#40744D',
    marginHorizontal: 7,
  },
});
