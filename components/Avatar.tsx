import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface AvatarProps {
  uri: string;
}

const Avatar = ({ uri }: AvatarProps) => {
  return <Image source={{ uri }} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Avatar;
