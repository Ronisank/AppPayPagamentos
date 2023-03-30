import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";


export default function Registration({ navigation }) {

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [number_rg, setNumber_rg] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  function navigateForInitial() {
    navigation.navigate('Initial')
  }

  function navigateForAddress() {
    if (!fullName) {
      alert('Nome é obrigatório')
    } else if (fullName.length < 8 || fullName.length > 120) {
      alert('O nome precisa ter o mínimo de 8 caracteres e o máximo de 120 caracteres')
    } else if (!phone) {
      alert('Número do telefone é obrigatório')
    } else if (!email) {
      alert('Email é obrigatório')
    } else if (!number_rg) {
      alert('Número do RG é obrigatório')
    } else if (!cpf || cpf.length < 11) {
      alert('Número do cpf é obrigatório, 11 dígitos')
    } else if (!password) {
      alert('Senha é obrigatório')
    } else if (password.length < 8 || password.length > 16) {
      alert('A senha precisa ter o mínimo de 8 caracteres e o máximo de 16 caracteres')
    } else {
      navigation.navigate('Address', {
        users: {
          fullname: fullName,
          contact: phone,
          email: email,
          number_rg: number_rg,
          cpf: cpf,
          password: password
        }
      })

    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Conta</Text>
      <ScrollView>
        <View style={styles.containerInput}>
          <Text style={styles.inputLabel}>Nome completo</Text>
          <TextInput style={styles.input}
            autoFocus={true}
            placeholderTextColor="#fff"
            selectionColor="#fff"
            maxLength={120}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.inputLabel}>Telefone</Text>
          <TextInput style={styles.input}
            placeholderTextColor="#fff"
            selectionColor="#fff"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input}
            placeholderTextColor="#fff"
            selectionColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Número do RG</Text>
          <TextInput style={styles.input}
            placeholderTextColor="#fff"
            selectionColor="#fff"
            keyboardType="number-pad"
            value={number_rg}
            onChangeText={setNumber_rg}
          />

          <Text style={styles.inputLabel}>CPF</Text>
          <TextInput style={styles.input}
            placeholderTextColor="#fff"
            selectionColor="#fff"
            keyboardType="number-pad"
            maxLength={11}
            value={cpf}
            onChangeText={setCpf}
          />

          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput style={styles.input}
            placeholderTextColor="#fff"
            selectionColor="#fff"
            maxLength={16}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={navigateForInitial}>
            <Text style={styles.textButton}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateForAddress}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2BF27',

  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  containerInput: {
    width: '100%',
    margin: 15,
    paddingLeft: 5,
    alignItems: 'flex-start',

  },
  input: {
    backgroundColor: '#282B59',
    height: 60,
    width: '90%',
    padding: 10,
    borderColor: '#14d945',
    borderWidth: 3,
    borderRadius: 10,
    textAlign: 'left',
    color: '#FFF',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,

  },
  button: {
    width: '40%',
    height: 60,
    backgroundColor: '#118CD9',
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 15,

  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',

  },
});

