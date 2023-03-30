import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

export default function AddressRegistration({ navigation, route }) {


    const [select, setSelect] = useState([])
    const [state, setState] = useState('')
    const [cep, setCep] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')

    const { users } = route.params
    console.log(route.params)

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(async (response) => {
                const dataSelect = await response.json()
                console.log(dataSelect.nome)

                setSelect(dataSelect)
            }
            )
            .catch(() => {
                console.log('Erro')
                Alert('Houve um erro na chamada')
            })
    }, [])

    useEffect(() => {

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(async (response) => {
                const data = await response.json()

                setCep(cep)
                setStreet(data.logradouro)
                setRegion(data.bairro)
                setCity(data.localidade)
                setState(data.uf)
            }
            )
            .catch(() => {
                console.log('Erro')
                Alert('Houve um erro na chamada')
            })

    }, [cep])

    function navigateForRegistration() {
        navigation.goBack()
    }

    function navigateForPaymentDay() {
        if (!cep) {
            alert('O CEP é obrigatório')
        } else if (cep.length < 8) {
            alert('Digite 8 números para o CEP')
        } else if (!street) {
            alert('Nome da rua é obrigatório')
        } else if (!city) {
            alert('Nome da cidade é obrigatório')
        } else if (!state) {
            alert('o nome do estado é obrigatório')
        } else if (!region) {
            alert('O nome do bairro é obrigatório')
        } else if (!number) {
            alert('O número da residência é obrigatório')
        } else {
            navigation.navigate('PaymentDay', {
                users,
                address: {
                    cep: cep,
                    street: street,
                    city: city,
                    state: state,
                    region: region,
                    number: number,
                    complement: complement
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Endereço</Text>
            <ScrollView>
                <View style={styles.containerInput}>
                    <Text style={styles.inputLabel}>CEP</Text>
                    <TextInput style={styles.input}
                        placeholderTextColor="#fff"
                        keyboardType="numeric"
                        maxLength={8}
                        value={cep}
                        onChangeText={setCep}

                    />

                    <Text style={styles.inputLabel}>Rua</Text>
                    <TextInput style={styles.input}
                        placeholderTextColor="#fff"
                        value={street}
                        onChangeText={setStreet}
                    />

                    <Text style={styles.inputLabel}>Cidade</Text>
                    <TextInput style={styles.input}
                        placeholderTextColor="#fff"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>
                <View>
                    <Picker
                        dropdownIconRippleColor="#14d945"
                        dropdownIconColor="#fff"
                        mode="dropdown"
                        selectedValue={state}
                        style={styles.select}


                        onValueChange={(value) => setState(value)} >
                        <Picker.Item label="Selecione um estado" value="" enabled={false} />
                        {
                            select.map((selection, index) =>
                                <Picker.Item label={selection.nome} value={selection.nome}
                                    key={index.id} />)
                        }

                    </Picker>
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.inputLabel}>Bairro</Text>
                    <TextInput style={styles.input}
                        placeholderTextColor="#fff"

                        value={region}
                        onChangeText={setRegion}
                    />

                    <Text style={styles.inputLabel}>N° da residência</Text>
                    <TextInput style={styles.input}
                        placeholderTextColor="#fff"
                        keyboardType="number-pad"
                        value={number}
                        onChangeText={setNumber}
                    />

                    <Text style={styles.inputLabel}>Complemento</Text>
                    <TextInput style={styles.input}
                        placeholderTextColor="#fff"
                        value={complement}
                        onChangeText={setComplement}
                    />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={navigateForRegistration}>
                        <Text style={styles.textButton}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={navigateForPaymentDay}>
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
    select: {
        margin: 20,
        backgroundColor: '#282B59',
        color: '#fff',
        borderColor: '#14d945',

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