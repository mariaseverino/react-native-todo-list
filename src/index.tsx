import React, { useState } from 'react'
import { Animated, FlatList, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import  { MaterialIcons } from '@expo/vector-icons'
import { RectButton, Swipeable } from 'react-native-gesture-handler'

import colors from './colors'

interface Todo {
    key: string
    name: string
    date: Date
    done: boolean
}

export default function App() {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDate, setselectedDate] = useState(new Date())
    const [showDate, setShowDate] = useState(Platform.OS == 'ios')

    const [todoList, setTodoList] = useState<Todo[]>([])
    const [todo, setTodo] = useState<string>()
    const [count, setCount] = useState(0)
    
    const handleInputChange = (value: string) => {
        setTodo(value)
    }

    const handleAddTodo = () => {
        setCount(oldCount => oldCount + 1)

        if (todo){
            setTodoList([...todoList, {
                key: String(count),
                name: todo,
                date: selectedDate,
                done: false}
            ])
        }
        console.log(todoList)
        setTodo('')
        setModalVisible(!modalVisible)
    }

    const handleTimeChange = (event: Event, value: Date | undefined) => {
        if (Platform.OS == 'android'){
            setShowDate(oldState => !oldState)
        }
        if (value){
            setselectedDate(value)
            setShowDate(false)
        }
    }

    const handleOpenDateTime = () => {
        setShowDate(oldState => !oldState)
    }

    const handleConcludedTodo = async (key: string) => {
        todoList.map(item => {
            if (item.key == key)
                item.done = !item.done;
        });

        setTodoList([...todoList])
    }

    const handleRemoveTodo = (key: string) => {
        setTodoList((list) => list.filter((item) => item.key !== key))
    }

    const _renderItem = (item: Todo) => {
        return (
            <Swipeable
                overshootLeft={false}
                renderLeftActions={() => (
                    <Animated.View style={styles.removeButton}>
                        <RectButton
                            onPress={() => handleRemoveTodo(item.key)}
                            style={{alignItems: "center", width: 40, justifyContent: 'center', }}
                        >
                            <MaterialIcons name="delete-outline" color={colors.white} size={25}/>
                        </RectButton>
                    </Animated.View>
                )}
            >
                <View style={styles.containerTodo}>
                    <TouchableOpacity 
                        onPress={() => handleConcludedTodo(item.key)}
                        style={[styles.checkbox,
                            item.done && styles.checkbox2
                        ]}>
                        {
                            item.done && <MaterialIcons name="done" size={17} color={colors.white}/>
                        }
                    </TouchableOpacity>

                    <Text style={[styles.todo, item.done && styles.todo2]}>{item.name}</Text>
                </View>
            </Swipeable>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Tarefas</Text>

                <FlatList
                    data={todoList}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => _renderItem(item)}
                />
                
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialIcons
                        name="add-circle"
                        color={colors.green}
                        size={60}
                    />
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={modalVisible}
                animationIn="slideInDown"
                animationInTiming={0.7}
                onBackdropPress = {() => setModalVisible (!modalVisible)}
                
            >
                <View style={styles.modal}>
                    <TextInput
                        placeholder="Novo todo"
                        onChangeText={handleInputChange}
                        style={styles.input}
                    />
                    {
                        showDate && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="spinner"
                                onChange={handleTimeChange}
                            />
                        )
                    }
                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity style={styles.viewDate}
                                onPress={handleOpenDateTime}
                            >   
                                <View >
                                    {/* mudar isso aqui */}
                                    <Text style={styles.textDate}>
                                        {`Data ${format(selectedDate, ' dd | MM ')}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            
                        )
                    }
                    <TouchableOpacity style={styles.button1}
                        onPress={handleAddTodo}
                    >
                        <Text style={styles.textButton}>Corfirmar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

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
        // backgroundColor: '#E5E5E5',
        paddingLeft: 15,
        backgroundColor: colors.white, 
        // opacity: 0.7,
        alignItems: 'center',
        borderRadius: 12,
    },
    containerTodo2: {
        backgroundColor: '#E5E5E5',
        borderRadius: 12,
        height: 40
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
    checkbox2: {
        width: 28,
        height: 28,
        backgroundColor: colors.green,
        borderWidth: 1
    },
    todo: {
        color: colors.text,
        fontSize: 20
    },
    todo2: {
        textDecorationLine: 'line-through'
    },
    button: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center'
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
    button1: {
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
        backgroundColor: colors.gray,
        marginVertical: 30,
        borderRadius: 5,
        paddingHorizontal: 5,
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
