import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Помилка: ' + error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>З поверненням!</Text>
        <Text style={styles.subTitle}>Раді бачити тебе знову</Text>
        <View style={styles.inputsContainer}>
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
        <Link href={'/forgot-password'} style={styles.label}>
          Забули пароль?
        </Link>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Вхід</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={{ fontSize: 17 }}>Не маєте акаунту?</Text>
        <Link
          replace
          href="/register"
          style={{ fontSize: 17, color: '#40744D' }}
        >
          Зареєструватись зараз
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
  },
  backButton: {
    marginVertical: 13,
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
  label: {
    paddingRight: 10,
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#40744D',
    fontFamily: 'NotoSansSemiBold',
    marginBottom: 50,
  },
  loginButton: {
    width: width * 0.9,
    backgroundColor: '#40744D',
    paddingVertical: 20,
    borderRadius: 35,
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
  footerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
    marginTop: '80%',
  },
});
