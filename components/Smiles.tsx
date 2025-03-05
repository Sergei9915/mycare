import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { SMILES } from '@/data/smiles';

interface SmileProps {
  img: ImageSourcePropType;
  text: string;
}

const Smile = ({ img, text }: SmileProps) => {
  return (
    <View style={styles.emojiCol}>
      <Image style={styles.emoji} source={img} />
      <Text style={styles.subtext}>{text}</Text>
    </View>
  );
};

const Smiles = () => {
  return (
    <View style={styles.skinStatus}>
      <Text style={styles.sectionTitle}>Як твій настрій?</Text>
      <FlatList
        data={SMILES}
        renderItem={({ item }) => <Smile key={item.id} {...item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Smiles;

const styles = StyleSheet.create({
  skinStatus: {
    padding: 20,
    backgroundColor: '#DBEEE0',
    borderRadius: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'NotoSansBold',
    marginBottom: 16,
  },
  emoji: { width: 38, height: 38 },
  emojiCol: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 25,
  },
  subtext: {
    fontSize: 10,
    fontFamily: 'NotoSansRegular',
    color: '#575757',
  },
});
