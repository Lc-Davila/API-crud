import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

import styles from "../styles/styles";

import { createPeople, updatePeople } from "../peopleCrud";

export default function AddEditScreen({ route, navigation }) {

  const people = route.params?.people;

  const [firstName, setFirstName] = useState(people?.firstName || "");
  const [lastName, setLastName] = useState(people?.lastName || "");
  const [email, setEmail] = useState(people?.email || "");
  const [phone, setPhone] = useState(people?.phone || "");

  async function save(){

    const data = { firstName, lastName, email, phone };

    if(people){

      await updatePeople(people.id, data);

    }else{

      await createPeople(data);

    }

    navigation.goBack();
  }

  return(

    <View style={styles.container}>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

<TextInput
  placeholder="Phone"
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad" 
/>

      <Button
        title="Salvar"
        onPress={save}
      />

      <Button
        title="Cancelar"
        onPress={() => navigation.goBack()}
      />

    </View>
  );
}
