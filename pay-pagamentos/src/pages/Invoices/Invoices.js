import { View, Text, StyleSheet } from "react-native";
import { API } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";


export default function Invoices() {

    const focusScreen = useIsFocused()
    const [result, setResult] = useState([])
    const [pays, setPays] = useState([])

    const getResult = async () => {

        const values = await AsyncStorage.getItem('@my_user:id')
        const parseValues = JSON.parse(values)
        setResult(parseValues)

    }
    getResult()

    useEffect(() => {
        if (focusScreen === true) {
            update()
            getResult()
        }
    }, [focusScreen])

    function update() {
        fetch(API + "/invoices" + "?user_id=" + result.id)
            .then(async (response) => {
                const data = await response.json()
                console.log(data)
                if (!data) {
                    alert('Sem boleto pago ainda')
                } else {
                    await AsyncStorage.setItem('@my_user:id', JSON.stringify(data))
                    console.log(data)
                    setPays(data)
                }
            })
            .catch(() => alert('Houve um erro ao carregar a lista '))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Boletos Pagos</Text>
            {
                pays.map((data, index) => (
                    <View style={styles.invoicesContainer} key={index.id}>
                        <View style={styles.textContainer}>
                            <Text>{data.date}</Text>
                            <Text>R$: {data.amount}</Text>
                        </View>
                        <View>
                            <Text>{data.recipient}</Text>
                        </View>
                    </View>
                )
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2BF27',
        alignItems: 'center',
        paddingTop: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        justifyContent: 'flex-start',
    },
    invoicesContainer: {
        width: '100%',

    },
    textContainer: {
        fontSize: 18,
        color: '#A9A9A9',

    }
})