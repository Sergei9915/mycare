import { ImageSourcePropType } from 'react-native';

export type Smile = {
  id: number;
  img: ImageSourcePropType;
  text: string;
};

export const SMILES: Smile[] = [
  {
    id: 1,
    text: 'Дуже погано',
    img: require('../assets/images/smiles/1.png'),
  },
  {
    id: 2,
    text: 'Погано',
    img: require('../assets/images/smiles/2.png'),
  },
  {
    id: 3,
    text: 'Спокійно',
    img: require('../assets/images/smiles/3.png'),
  },
  {
    id: 4,
    text: 'Гарно',
    img: require('../assets/images/smiles/4.png'),
  },
  {
    id: 5,
    text: 'Дуже гарно',
    img: require('../assets/images/smiles/5.png'),
  },
];
