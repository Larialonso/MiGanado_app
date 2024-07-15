<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../api/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';

// Función para generar datos de animales aleatoriamente
const generateRandomAnimals = (num) => {
  const animals = [];
  const prefixes = ['A', 'B', 'C', 'D', 'E'];
  for (let i = 0; i < num; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(Math.random() * 1000);
    animals.push({ numeroCaravana: `${prefix}${number}` });
  }
  return animals;
};

const AnimalItem = ({ item, isSelected, onSelect }) => (
  <TouchableOpacity style={styles.animalItem} onPress={() => onSelect(item)}>
    <Text style={styles.animalText}>N°: {item.numeroCaravana}</Text>
  </TouchableOpacity>
);

export default function AnimalListScreen() {
  const route = useRoute();
  const { lote } = route.params; // Asegúrate de que route.params no es undefined
  const [animalLimit, setAnimalLimit] = useState(100);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Generar datos de animales aleatoriamente para prueba
    const randomAnimals = generateRandomAnimals(10);
    setAnimals(randomAnimals);
  }, []);
=======
import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { buscarAnimal, actualizarNombreLote } from '../../api/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../api/UserContext';

const AnimalSearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const { lote } = route.params;

  const [caravanaNumber, setCaravanaNumber] = useState('');
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [animals, setAnimals] = useState(lote.animales || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLoteName, setNewLoteName] = useState('');
>>>>>>> main

  const handleAnimalSelection = (animal) => {
    setSelectedAnimals((prevSelected) =>
      prevSelected.includes(animal.numeroCaravana)
        ? prevSelected.filter((a) => a !== animal.numeroCaravana)
        : [...prevSelected, animal.numeroCaravana]
    );
  };

  const handleSearchAnimal = async () => {
    try {
      const results = await buscarAnimal(userId, lote.id, caravanaNumber);
      setAnimals(results);
    } catch (error) {
      console.error('Error searching animal:', error);
      Alert.alert('Error', 'Error al buscar el animal. Inténtalo de nuevo más tarde.');
    }
  };

  const handleUpdateLoteName = async () => {
    try {
      await actualizarNombreLote(lote.id, newLoteName);
      Alert.alert('Éxito', 'El nombre del lote ha sido actualizado.');
      lote.nombre_lote = newLoteName; // Actualiza el nombre en el estado local
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating lote name:', error);
      Alert.alert('Error', 'No se pudo actualizar el nombre del lote. Inténtalo de nuevo más tarde.');
    }
  };  

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.limitContainer}>
          <Text style={styles.label}>Límite de animales</Text>
          <TextInput
            style={styles.input}
            value={String(animalLimit)}
            keyboardType="numeric"
            onChangeText={(text) => setAnimalLimit(Number(text))}
          />
        </View>
      </View>
      <ScrollView>
        {animals.map((animal, index) => (
          <AnimalItem
            key={index}
            item={animal}
            isSelected={selectedAnimals.includes(animal.numeroCaravana)}
            onSelect={handleAnimalSelection}
          />
        ))}
      </ScrollView>
    </View>
=======
    <ThemedView style={styles.container}>
      <ThemedView style={styles.set_container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <ThemedText style={styles.title}>{lote.nombre_lote}</ThemedText>
            <TouchableOpacity style={styles.iconButton} onPress={() => setIsModalVisible(true)}>
              <FontAwesomeIcon icon={faPen} size={24} color="#000000" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('vistas/IngresoAnimal')}>
              <FontAwesomeIcon icon={faPlus} size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesomeIcon icon={faTrash} size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <ThemedText style={styles.label}>Buscar Animal</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Número de caravana"
            value={caravanaNumber}
            onChangeText={setCaravanaNumber}
            placeholderTextColor="#666666"
          />
          <TouchableOpacity style={styles.button} onPress={handleSearchAnimal}>
            <ThemedText style={styles.buttonText}>Buscar</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.selectAllButton} onPress={selectAllAnimals}>
          <ThemedText style={styles.selectAllText}>
            {selectedAnimals.length === animals.length ? 'Deseleccionar todo' : 'Seleccionar todo'}
          </ThemedText>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.animalList}>
          {animals.map(animal => (
            <TouchableOpacity
              key={animal.id}
              style={[styles.animalItem, selectedAnimals.includes(animal.id) && styles.animalItemSelected]}
              onPress={() => toggleAnimalSelection(animal.id)}
            >
              <ThemedText style={styles.animalTag}>N°: {animal.tag}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Actualizar Nombre del Lote</ThemedText>
          <TextInput
            style={styles.modalInput}
            placeholder="Nuevo nombre del lote"
            value={newLoteName}
            onChangeText={setNewLoteName}
            placeholderTextColor="#666666"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleUpdateLoteName}>
            <ThemedText style={styles.modalButtonText}>Actualizar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
            <ThemedText style={styles.modalButtonText}>Cancelar</ThemedText>
          </TouchableOpacity>
        </View>
      </Modal>
    </ThemedView>
>>>>>>> main
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    padding: 16,
    backgroundColor: '#fff',
  },
=======
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  set_container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
>>>>>>> main
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
<<<<<<< HEAD
    flexWrap: 'wrap',
  },
  limitContainer: {
    flexDirection: 'row',
=======
    marginBottom: 20,
  },
  leftHeader: {
    flexDirection: 'row',    
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  searchContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#407157',
    paddingVertical: 10,
    borderRadius: 20,
>>>>>>> main
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
<<<<<<< HEAD
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 60,
    textAlign: 'center',
=======
  selectAllButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#407157',
    borderRadius: 20,
  },
  selectAllText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  animalList: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
>>>>>>> main
  },
  animalItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
=======
    padding: 15,
    borderWidth: 1,
>>>>>>> main
    borderColor: '#ccc',
  },
  animalText: {
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#407157',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
