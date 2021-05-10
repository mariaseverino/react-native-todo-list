import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    title: {
        fontSize: 28,
        color: colors.title,
        marginVertical: 30,
        marginHorizontal: 10
    },
    containerTodo: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 10,
        height: 40,
        paddingLeft: 15,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius: 12,
    },
    checkbox: {
        width: 27,
        height: 27,
        borderColor: colors.green,
        borderWidth: 3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    checkboxAfter: {
        width: 28,
        height: 28,
        backgroundColor: colors.green,
        borderWidth: 1,
        opacity: 0.7
    },
    todo: {
        color: colors.text,
        fontSize: 20
    },
    todoAfter: {
        textDecorationLine: 'line-through',
        opacity: 0.7
    },
    buttonAdd: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: 100,
        height: 100,
        backgroundColor: colors.gray
    },
    modal: {
        width: 300,
        alignSelf:'center',
        backgroundColor: colors.white,
        borderRadius: 40,
        alignItems: 'center',
        paddingVertical: 30
    },
    input: {
        borderBottomWidth: 2,
        borderColor: colors.gray,
        color: colors.text,
        width: 260,
        fontSize: 18,
        padding: 10,
    },
    button: {
        borderRadius: 12,
        width: 200,
        height: 48,
        backgroundColor: colors.green,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textButton: {
        fontSize: 16,
        color: colors.white,
    },
    viewDate: {
        marginVertical: 30,
        borderRadius: 5,
        paddingHorizontal: 5,
        borderColor: colors.gray,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        padding: 2,
        width: 220,
        alignItems: 'center'
    },
    textDate:{
        fontSize: 24,
        color: colors.text,
    },
    removeButton: {
        backgroundColor: colors.red,
        opacity: 0.8,
        borderBottomEndRadius: 5,
        borderTopEndRadius: 5 ,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        height: 40,
        width: 50,
        position: 'relative',
        left: 20
    }
});

export default styles