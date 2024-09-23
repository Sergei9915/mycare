import { ImageSourcePropType } from 'react-native';

export type Onboard = {
  id: number;
  title: string;
  text: string;
  img: ImageSourcePropType;
};

export const ONBOARDING: Onboard[] = [
  {
    id: 1,
    img: require('../assets/images/backgrounds/bg1.png'),
    title: 'Здоров’я шкіри за мить',
    text: 'Відстежуйте кожну точку за допомогою фотографії та сповіщень',
  },
  {
    id: 2,
    img: require('../assets/images/backgrounds/bg2.png'),
    title: 'Чат з косметологом',
    text: 'Наш чат доступний 24/7, тількі професійні працівники',
  },
  {
    id: 3,
    img: require('../assets/images/backgrounds/bg3.png'),
    title: 'Календар придатності',
    text: 'Ми допоможемо вам відстежувати термін придатності косметики',
  },
  {
    id: 4,
    img: require('../assets/images/backgrounds/bg4.png'),
    title: 'Персоналізовані рекомендації',
    text: 'Після опитування ми створюємо ідеільний догляд за вашою шкірою',
  },
];
