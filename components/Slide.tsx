import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export interface SlideProps {
  title: string;
  text: string;
  img: ImageSourcePropType;
}

const { width, height } = Dimensions.get('window');

export default function Slide({
  title,
  text,
  img,
}: SlideProps): React.JSX.Element {
  return (
    <View>
      <ImageBackground source={img} style={styles.img} resizeMode="cover">
        <View style={styles.container}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.text}>
            {text}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '95%',
    alignItems: 'center',
    width: '100%',
  },
  img: {
    width: width,
    height: height * 0.55,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 27,
    marginBottom: 20,
    fontFamily: 'NotoSansBold',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#575757',
    fontFamily: 'NotoSansRegular',
    textAlign: 'center',
  },
});
