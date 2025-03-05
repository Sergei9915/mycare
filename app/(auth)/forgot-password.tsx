import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { Successfully } from '@/assets/icons/successfully';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(true);
  const { forgotPassword } = useAuth();

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      Alert.alert(
        'Якщо обліковий запис з цією електронною адресою існує, на нього надіслано лист з інструкціями для відновлення паролю.',
        '',
        [
          {
            text: 'OK',
            onPress: () => setShowConfirmation(false),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Помилка: ' + error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showConfirmation ? (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Забули пароль?</Text>
            <Text style={styles.subTitle}>
              Не переживай! Введіть адресу електронної пошти, пов’язану з вашим
              обліковим записом.
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={'#575757'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <Button title={'Відправити письмо'} onPress={handleForgotPassword} />
        </View>
      ) : (
        <View style={styles.confirmationContainer}>
          <View>
            <Successfully />
          </View>
          <Text style={styles.confirmationText}>
            Письмо для відновлення пароля надіслано!
          </Text>
          <Button title={'Назад до входу'} onPress={() => router.back()} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  backButton: {
    marginVertical: 13,
  },
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
  title: {
    fontFamily: 'NotoSansBold',
    fontSize: 27,
    lineHeight: 37,
    marginTop: 17,
  },
  subTitle: {
    fontFamily: 'NotoSansRegular',
    fontSize: 18,
    lineHeight: 25,
    color: '#A4A4A4',
    paddingTop: 12,
  },
  inputsContainer: { paddingTop: 40, paddingBottom: 70 },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  confirmationText: {
    fontFamily: 'NotoSansBold',
    fontSize: 27,
    lineHeight: 36,
  },
});
