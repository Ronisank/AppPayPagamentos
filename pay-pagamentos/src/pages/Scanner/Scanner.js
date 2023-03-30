import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { API } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonStyles } from "../../Styles/CommonStyles";

export default function Scanner({ navigation }) {

  const [data, setData] = useState('')

  const [hasPermission, setHasPermission] = useState(false)
  const [scanned, setScanned] = useState(false)

  const [id, setId] = useState([''])
  const [amount, setAmount] = useState([])
  const [recipient, setRecipient] = useState([])

  const getPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted' ? true : false)
  }

  useEffect(() => {
    getPermission()
  }, [])

  const getData = async () => {

    const values = await AsyncStorage.getItem('@my_log:login_id')
    const parsevalues = JSON.parse(values)
    setData(parsevalues)
  }
  getData()

  function getResult({ data }) {
    setScanned(true)


    fetch(API + "/debts?id=" + data)
      .then(async (response) => {
        const data = await response.json()

        if (data.length === 1) {
          await AsyncStorage.setItem('@my_user:id', JSON.stringify(data[0]))
          setId((data[0]).id)
          setAmount((data[0]).amount)
          setRecipient((data[0]).recipient)

          navigation.navigate('PayDetails', {
            id, amount, recipient

          })

        } else {
          alert('Codigo inválido')
        }
      })
      .catch(() => alert('Houve ao tentar scannear'))

  }

  function openCamera() {
    setScanned(false)
    getPermission()

  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomwText}>Olá, {data.fullname}</Text>

      <View style={styles.containerBarCode}>
        {
          hasPermission === false && <Text>Permissão para câmera negada</Text>
        }

        {
          (hasPermission === true && scanned === false) &&
          <BarCodeScanner
            onBarCodeScanned={getResult}
            style={{
              width: Dimensions.get('screen').width * 0.8,
              height: Dimensions.get('screen').height * 0.7,
            }}
            barCodeTypes={['code39']}
          />
        }
      </View>

      <View style={commonStyles.containerButton}>

        <TouchableOpacity style={commonStyles.button} onPress={openCamera}>
          <Text style={commonStyles.textButton}>Scannear novo boleto</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2BF27',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft:10
  },
  welcomwText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerBarCode: {
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
  }
})