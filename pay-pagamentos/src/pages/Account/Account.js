import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { API } from "../../services/api";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonStyles } from "../../Styles/CommonStyles";

export default function Account({ navigation }) {

    const [data, setData] = useState('')
    const [load, setLoad] = useState(false)

    const getData = async () => {

        const values = await AsyncStorage.getItem('@my_log:login_id')
        const parsevalues = JSON.parse(values)
        setData(parsevalues)
    }
    getData()

    useEffect(() => {
        setLoad(true)
    }, [setData])

    function navigateForInitial() {
        navigation.navigate('Initial')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Dados da Conta</Text>
            <View style={styles.containerText}>

                {load === true && <Text style={styles.accountText}>Nome: {data.fullname} </Text>}
                {load === true && <Text style={styles.accountText}>CPF: {data.cpf} </Text>}
                {load === true && <Text style={styles.accountText}>Telefone: {data.contact} </Text>}
                {load === true && <Text style={styles.accountText}>RG: {data.number_rg} </Text>}
            </View>

            <View style={{ ...commonStyles.containerButton, paddingTop: '90%' }}>
                <TouchableOpacity style={commonStyles.button} onPress={navigateForInitial}>
                    <Text style={commonStyles.textButton}>Sair do APP</Text>
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
        paddingTop: 35
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        color: '#FFF'
    },
    containerText: {
        width: '100%',
        marginBottom: 20
    },
    accountText: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#A9A9A9',
        paddingTop: 20,
    },
})