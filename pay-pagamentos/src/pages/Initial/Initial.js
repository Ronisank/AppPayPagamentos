import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

import LottieView from "lottie-react-native";

import payAnimation from '../../../assets/payment-scan.json'
import { commonStyles } from "../../Styles/CommonStyles";

export default function Initial({ navigation }) {

    function navigateForLogin() {
        navigation.navigate('Login')
    }

    function navigateForRegistration() {
        navigation.navigate('Registration')
    }

    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                style={{ height: Dimensions.get('screen').height * 0.5 }}
                source={payAnimation}
            />
            <View style={styles.containerButton}>
                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.textButton} onPress={navigateForRegistration} >Abrir conta gratuita</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.textButton} onPress={navigateForLogin} >Fazer login</Text>
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
        justifyContent: 'center',
        paddingTop: 20,
    },
    containerButton: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        padding: 10,

    },
});