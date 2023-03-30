import { StyleSheet } from 'react-native'

export const commonStyles = StyleSheet.create({
    button: {
        width: '90%',
        height: 60,
        backgroundColor: '#118CD9',
        elevation: 15,
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 15,

    },
    textButton: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    containerButton: {
        width: '100%',
        alignItems: 'center',
    },
})