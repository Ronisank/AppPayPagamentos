import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useState } from "react";
import { Calendar } from "react-native-calendars";

import { format } from 'date-fns'


export default function PaymentDay({ navigation, route }) {

    const { users, address } = route.params
    console.log(users, address)

    function navigateForAddress() {
        navigation.goBack()
    }

    function navigateForTerms() {
        if (!date) {
            alert('Selecione uma data para o pagamento')
        } else {
            navigation.navigate('Terms', {
                users,
                address,
                billing_day: date
            })
        }
    }

    const dataAtual = format(new Date(), 'yyyy-MM-dd')

    const [date, setDate] = useState(dataAtual)

    console.log(date)


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Qual a data da cobrança ?</Text>
            <Calendar
                minDate={dataAtual}
                style={styles.calendar}
                markedDates={{
                    [date]: {
                        selected: true,
                        marked: true,
                        selectedColor: '#F2BF27',
                        dotColor: 'red'
                    },
                }}
                onDayPress={(currentDate) => setDate(currentDate.dateString)}
                theme={{
                    selectedDayTextColor: '#14D945',
                    todayTextColor: '#FFF',

                    calendarBackground: '#282B59',
                    dayTextColor: '#FFF',
                    arrowColor: '#FFF',
                    monthTextColor: '#FFF'
                }}
            />
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={navigateForAddress}>
                    <Text style={styles.textButton}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={navigateForTerms}>
                    <Text style={styles.textButton}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
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
    calendar: {
        backgroundColor: '#14D945',
        borderRadius: 10,
        marginVertical: 20
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