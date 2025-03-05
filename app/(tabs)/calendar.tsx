import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase'; // Імпортуємо db
import { useAuth } from '../../context/AuthContext'; // Приклад імпорту контексту авторизації

type Note = {
  id: string;
  date: string;
  text: string;
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<{ [date: string]: Note[] }>({});
  const [markedDates, setMarkedDates] = useState<{
    [date: string]: { marked: boolean; dotColor: string };
  }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, 'notes'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const loadedNotes: { [date: string]: Note[] } = {};
      const marked: { [date: string]: { marked: boolean; dotColor: string } } =
        {};

      querySnapshot.forEach(doc => {
        const noteData = doc.data();
        if (!loadedNotes[noteData.date]) {
          loadedNotes[noteData.date] = [];
        }
        loadedNotes[noteData.date].push({
          id: doc.id,
          date: noteData.date,
          text: noteData.text,
        });
        // Позначаємо дні, де є нотатки
        marked[noteData.date] = { marked: true, dotColor: 'red' };
      });

      setNotes(loadedNotes);
      setMarkedDates(marked);
    } catch (error) {
      console.error('Помилка при завантаженні нотаток:', error);
    }
  };

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setNote('');
    setModalVisible(true);
  };

  const handleAddNote = async () => {
    if (!selectedDate || !note.trim() || !user) return;

    try {
      // Додаємо новий документ у Firestore
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        date: selectedDate,
        text: note,
        createdAt: new Date(),
      });

      // Відзначаємо дату червоною крапкою
      setMarkedDates(prev => ({
        ...prev,
        [selectedDate]: { marked: true, dotColor: 'red' },
      }));

      // Оновлюємо локальний стейт, щоб одразу відобразити нову нотатку
      setNotes(prev => ({
        ...prev,
        [selectedDate]: [
          ...(prev[selectedDate] || []),
          { id: Date.now().toString(), date: selectedDate, text: note },
        ],
      }));

      setNote('');
      setModalVisible(false);
      await loadNotes(); // Перечитати нотатки, щоб синхронізувати з Firestore
    } catch (error) {
      console.error('Помилка при додаванні нотатки:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCalendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#2d4150',
          selectedDayBackgroundColor: '#007AFF',
          selectedDayTextColor: '#ffffff',
        }}
      />
      {/* Модальне вікно додавання нотатки */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Додати нотатку на {selectedDate}
            </Text>

            <TextInput
              style={styles.input}
              value={note}
              onChangeText={setNote}
              placeholder="Введіть текст нотатки..."
              multiline
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
              <Text style={styles.buttonText}>Зберегти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: '#ccc', marginTop: 10 },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.buttonText, { color: '#333' }]}>
                Скасувати
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {notes[selectedDate]?.map(noteItem => (
        <View key={noteItem.id} style={styles.noteItem}>
          <Text>{noteItem.text}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

// Стилі
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noteItem: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
