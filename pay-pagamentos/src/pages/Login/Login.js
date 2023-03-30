import { useState } from "react";
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { API } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from '../../../assets/LogoPay1.png'
import { commonStyles } from "../../Styles/CommonStyles";

export default function Login({ navigation }) {

  const [cpf, setCPF] = useState([])
  const [password, setPassword] = useState([])
  const [id, setId] = useState('')


  function navigateForRegistration() {
    navigation.navigate('Registration')
  }

  function confirmLogin() {
    if (!cpf) {
      alert('Digite um CPF válido')
    } else if (!password) {
      alert('Digite sua senha')
    } else
      fetch(API + "/users" + "?cpf=" + cpf + "&passoword" + password)
        .then(async (response) => {
          const data = await response.json()

          if (data.length === 1) {

            await AsyncStorage.setItem('@my_log:login_id', JSON.stringify(data[0]))

            navigation.navigate('Home')
          } else {
            alert('Usuário não cadastrado')
          }
        })
        .catch(() => console.log('Erro'))
  }

  return (
    <View style={styles.container}>

      <Image style={styles.image} source={Logo} />

      <View style={styles.containerInput} >
        <TextInput style={styles.input}
          placeholder='Digite seu CPF'
          placeholderTextColor="#fff"
          keyboardType="number-pad"
          maxLength={11}
          value={cpf}
          onChangeText={setCPF} />

        <TextInput style={styles.input}
          placeholder='Digite sua senha'
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry />

      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={commonStyles.button} onPress={confirmLogin}>
          <Text style={commonStyles.textButton} >Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateForRegistration}>
          <Text style={styles.actionText}>Abrir conta gratuita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2BF27',
    alignItems: 'center',
    paddingTop: 70,
  },
  image: {
    width: 150,
    height: 150,

  },
  containerInput: {
    width: '100%',
    margin: 15,
    padding: 10,
    alignItems: 'center'

  },
  input: {
    backgroundColor: '#14D945',
    height: 60,
    width: '90%',
    padding: 5,
    borderColor: '#282B59',
    borderWidth: 3,
    borderRadius: 10,
    textAlign: 'center',
    color: '#FFF',
    marginTop: 15,
  },
  containerButton: {
    width: '90%',
    alignItems: 'center',
  },
  actionText: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
