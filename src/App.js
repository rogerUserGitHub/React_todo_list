// useRef allows reference elements inside HTML
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ToDoList from './ToDoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

    // useState runsss after first render and after every update
    // useState returns Array
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    // bij refresh, laad todos uit local storage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    // bij toevoegen van todo, save in local storagee
    // want to store Todos in local storage, keeps after refresh (persistance)
    // useEffect takes as first param another function.
    // every time something changes, first function is being called
    // anytime anything in the array changes ([array of todos]), useEffect is called
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    // create copy of array, then set new State (do not change State directly)
    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        // if empty
        if (name === '') return
        setTodos(prevTodos => {
            // prev + new input with random ID
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]

        })
        todoNameRef.current.value = null
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos);
    }
    
    return (
    // cant put 2 elements in return. Use of <> wrapper/empty element = fragment
    // toggleTodo: pass function down to ToDolist to change value of todo item
        <>
            <ToDoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoNameRef} type="text" />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Complete</button>
            <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        </>
  );
};

export default App;