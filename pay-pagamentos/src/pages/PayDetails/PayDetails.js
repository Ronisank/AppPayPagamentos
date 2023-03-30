import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useState, useEffect } from 'react'

import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ptBR from 'date-fns/locale/pt-BR'
import { API } from '../../services/api'
import { commonStyles } from '../../Styles/CommonStyles'

export default function PayDetails({ navigation, route }) {

    const { id, amount, recipient } = route.params


    console.log(route.params)
    console.log(amount)

    const [cashBack, setCashback] = useState('')
    const [result, setResult] = useState([])

    const getResult = async () => {
        const values = await AsyncStorage.getItem('@my_user:id')
        const parseValues = JSON.parse(values)
        setResult(parseValues)
    }
    useEffect(() => {
        const account = amount * 0.1
        setCashback(account)
        getResult()
    }, [amount])

    function invoiceSave() {
        const date = format(new Date(), 'dd/MM/yyyy', { locale: ptBR })
        fetch(API + '/invoices', {
            body: JSON.stringify({
                recipient: recipient,
                amount: amount,
                date: date,
                code: id,
                user_id: result.id,
                cashback: cashBack
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                alert('Boleto pago com sucesso')
                navigation.navigate('Invoices')
            })
            .catch(() => alert('Houve um erro ao tentar pagar o boleto'))
    }
    function cancel() {
        navigation.navigate('Scanner')
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.payScreenText}>Para</Text>
                <Text style={styles.payText}>{recipient}</Text>

                <Text style={styles.payScreenText}>Valor</Text>
                <Text style={styles.payText}>{amount}</Text>

                <Text style={styles.payScreenText}>Código do boleto</Text>
                <Text style={styles.payText}>{id}</Text>

                <Text style={styles.payScreenText}>Cashback</Text>
                <Text style={styles.payText}>{cashBack}</Text>
            </View>

            <View style={commonStyles.containerButton}>
                <TouchableOpacity style={commonStyles.button} onPress={invoiceSave}>
                    <Text style={commonStyles.textButton}>Pagar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ ...commonStyles.button, backgroundColor: '#FF6961' }} onPress={cancel}>
                    <Text style={commonStyles.textButton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2BF27',
        alignItems: 'center',
        padding: 30,

    },
    containerText: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingTop: 20,
        marginBottom: 50,
        borderColor: '#A9A9A9',
        borderWidth: 1,
    },
    payText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#A9A9A9',
        paddingLeft: 15,
        paddingBottom: 15
    },
    payScreenText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFF',
        paddingLeft: 15
    }

})