import AsyncStorage from "@react-native-async-storage/async-storage"

export interface Todo {
    key: string
    name: string
    date: Date
    done: boolean
}

export interface StorageTodo {
    [id: string]: {
        data: Todo
    }
}

export async function AddTask(todo: Todo) : Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@taskmanager:todo')
        const oldTasks = data ? (JSON.parse(data) as StorageTodo) : {}

        const newTodo = {
            [todo.key]: {
                data: todo
            }
        }
        
        await AsyncStorage.setItem('@taskmanager:todo', JSON.stringify({
            ...newTodo,
            ...oldTasks
        }))
    }
    catch (error) {
        throw new Error(error)
    }
}

export async function LoadTasks() : Promise<Todo[]> {
    try {
        const data = await AsyncStorage.getItem('@taskmanager:todo')
        const tasks = data ? (JSON.parse(data) as StorageTodo) : {}
        
        const todoList = Object.keys(tasks).map((i) => {
            return {
                ...tasks[i].data
            }
        })
        return todoList
    }
    catch (error) {
        throw new Error(error)
    }
} 

export async function RemoveTask(todo: Todo) : Promise<void> {
    const data = await AsyncStorage.getItem('@taskmanager:todo')
    
    const tasks = data ? (JSON.parse(data) as StorageTodo) : {}

    delete tasks[todo.key]
    
    await AsyncStorage.setItem('@taskmanager:todo', JSON.stringify(tasks))

}

export async function ConcludedTask(key: string) : Promise<void>{
    
    const data = await AsyncStorage.getItem('@taskmanager:todo')
    
    const tasks = data ? (JSON.parse(data) as StorageTodo) : {}
    
    tasks[key].data.done = !tasks[key].data.done
    
    await AsyncStorage.setItem('@taskmanager:todo', JSON.stringify(tasks))

}