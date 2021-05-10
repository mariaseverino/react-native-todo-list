import React, { useEffect, useState } from 'react'
import { Animated, FlatList, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { RectButton, Swipeable } from 'react-native-gesture-handler'
import  { MaterialIcons } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { format } from 'date-fns'

import { AddTask, ConcludedTask, LoadTasks, RemoveTask } from './storage'

import colors from './colors'
import styles from './styles'

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

    const handleAddTodo = async () => {
        if (todo){
            setCount(oldCout => oldCout + 1)
            await AddTask({
                key: String(count),
                name: todo,
                date: selectedDate,
                done: false
            })

            const teste = await LoadTasks()

            setTodoList([...teste])

        }
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

    const handleConcludedTodo = async (todo: Todo) => {
        await ConcludedTask(todo.key)

        todoList.map(item => {
            if (item.key == todo.key)
                item.done = !item.done;
        });

        setTodoList([...todoList])
    }

    const handleRemoveTodo = async (todo: Todo) => {
        setTodoList((list) => list.filter((item) => item.key !== todo.key))
        await RemoveTask(todo)
    }

    const _renderItem = (item: Todo) => {
        return (
            <Swipeable
                overshootLeft={false}
                renderLeftActions={() => (
                    <Animated.View style={styles.removeButton}>
                        <RectButton
                            onPress={() => handleRemoveTodo(item)}
                            style={{alignItems: "center", width: 40, justifyContent: 'center', }}
                        >
                            <MaterialIcons name="delete-outline" color={colors.white} size={25}/>
                        </RectButton>
                    </Animated.View>
                )}
            >
                <View style={styles.containerTodo}>
                    <TouchableOpacity 
                        onPress={() => handleConcludedTodo(item)}
                        style={[styles.checkbox,
                            item.done && styles.checkboxAfter
                        ]}>
                        {
                            item.done && <MaterialIcons name="done" size={17} color={colors.white}/>
                        }
                    </TouchableOpacity>

                    <Text style={[styles.todo, item.done && styles.todoAfter]}>{item.name}</Text>
                </View>
            </Swipeable>
        )
    }

    useEffect(() => {
        async function load() {
            const taskStorage = await LoadTasks()
            setTodoList(taskStorage)
        }
        load()

    },[])

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
                    style={styles.buttonAdd}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <MaterialIcons
                        name="add"
                        color={colors.white}
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
                            <TouchableOpacity 
                                onPress={handleOpenDateTime}
                            >   
                                <View style={styles.viewDate}>
                                    {/* mudar isso aqui */}
                                    <Text style={styles.textDate}>
                                        {`${format(selectedDate, ' dd     MM     yyyy')}`}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            
                        )
                    }
                    <TouchableOpacity style={styles.button}
                        onPress={handleAddTodo}
                    >
                        <Text style={styles.textButton}>Corfirmar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

