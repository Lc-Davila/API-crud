import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Button, SafeAreaView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import styles from "../styles/styles";

import { getPeople } from "../peopleCrud";

import CardPersonal from "../components/CardPersonal";

export default function HomeScreen({ navigation }) {
  const [people, setPeople] = useState([]);

  async function loadPeople() {
    try {
      const data = await getPeople();
      setPeople(data);
    } catch (error) {
      console.error("Erro ao carregar pessoas:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>Lista de Pessoas</Text>
        
        <Button
          title="Adicionar Nova Pessoa"
          onPress={() => navigation.navigate("AddEdit")}
        />
      </View>

      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardPersonal
            item={item}
            navigation={navigation}
            refresh={loadPeople} 
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhuma pessoa cadastrada.
          </Text>
        }
      />
    </SafeAreaView>
  );
}