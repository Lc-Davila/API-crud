import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../peopleCrud";

import CardPersonal from "../components/CardPersonal";

export default function HomeScreen({ navigation }) {

  const [people, setPeople] = useState([]);

  async function loadPeople(){

    const data = await getPeople();

    setPeople(data);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadPeople();
    }, [])
  );

  return(
    <View style={styles.container}>
  
      <Text style={styles.title}>Pessoas</Text>
  
      <Button
        title="Adicionar Pessoa"
        onPress={() => navigation.navigate("AddEdit")}
      />
  
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
      />
  
    </View>
  );
}
  