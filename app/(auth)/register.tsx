import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const { register } = useAuth();

  const handleSignUp = async () => {
    if (!isChecked) {
      Alert.alert(
        'Будь ласка, підтвердіть, що вам виповнилося 18 років і що ви погоджуєтеся з умовами.'
      );
    }
    try {
      await register(name, email, password);
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Помилка: ' + error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Привіт!</Text>
              <Text numberOfLines={2} style={styles.subTitle}>
                Зареєструйся, щоб почати користуватися
              </Text>
            </View>
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ім’я"
                placeholderTextColor={'#575757'}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={'#575757'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor={'#575757'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#40744D' : undefined}
              />
              <Text style={styles.label}>
                Я підтверджую, що мені виповнилося 18 років, і я погоджуюся з
                Угодою користувача та Політикою конфіденційності
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSignUp}
              >
                <Text style={styles.registerText}>Реєстрація</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles.footerContainer}>
        <Text style={{ fontSize: 17 }}>Вже маєте акаунт?</Text>
        <Link replace href="/login" style={{ fontSize: 17, color: '#40744D' }}>
          Увійти зараз
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    lineHeight: 37,
    fontFamily: 'NotoSansBold',
  },
  subTitle: {
    fontSize: 27,
    lineHeight: 37,
    fontFamily: 'NotoSansBold',
    width: '87%',
  },
  inputsContainer: { marginTop: 28, marginEnd: 10 },
  input: {
    fontSize: 17,
    lineHeight: 24,
    height: 60,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#A4A4A4',
    marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
  },
  label: {
    fontSize: 10,
  },
  buttonContainer: {
    marginTop: 26,
  },
  registerButton: {
    width: width * 0.9,
    backgroundColor: '#40744D',
    paddingVertical: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 18,
  },
  footerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  backButton: {
    marginVertical: 13,
  },
});
